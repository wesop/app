/**
 * @typedef ValidateControl
 * @prop {any} value
 * @prop {Function[]} validatorFns
 * @prop {string} errorMessage
 */

/**
 * @typedef ValidationError
 * @prop {string} [name]
 * @prop {string} message
 *
 * @param {string} name
 * @param {boolean} result
 *
 * @returns {ValidationError}
 */
function ValidationErrors(name, result) {
  let error = { message: '' };

  error[name] = result;

  return error;
};

/**
 * @param {string} name
 * @param {string} result
 */
function _validatorHandler(name, result) {
  if (!result) {
    return ValidationErrors(name, result);
  }

  return null;
};

export const Validators = {
  required(value) {
    return _validatorHandler('required', value == null || value == undefined || !value.length ? false : true);
  },

  /**
   * @param {number} length
   */
  min(length) {
    return (value) => {
      let strValue = value + '';

      return _validatorHandler('min', strValue.length < length ? false : true);
    };
  },

  /**
   * @param {number} length
   */
  max(length) {
    return (value) => {
      return _validatorHandler('max', (value + '').length > length ? false : true);
    };
  },

  /**
   * @param {number} min
   * @param {number} max
   */
  range(min, max) {
    return (value) => {
      return Validators.min(min)(value) || Validators.max(max)(value);
    };
  },

  /**
   * @param {string} value
   */
  email(value) {
    return Validators.pattern(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)(value);
  },

  password(value) {
    return Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).{0,}$/)(value);
  },

  digit(value) {
    return Validators.pattern(/^[0-9]{0,}$/)(value);
  },

  cellPhone(value)  {
    return Validators.pattern(/^\d{3}\d{3,4}\d{4}$/)((value + '').replace(/\-/g, ''));
  },

  tel(value)  {
    return Validators.pattern(/^\d{2,3}\d{3,4}\d{4}$/)((value + '').replace(/\-/g, ''));
  },

  BN(value) {
    // 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인
    if ((value = (value + '').match(/\d{1}/g)).length != 10) { return _validatorHandler('BN', false); }

    // 합 / 체크키
    let sum = 0, keys = [1, 3, 7, 1, 3, 7, 1, 3, 5];

    // 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에더합니다.
    keys.forEach((key, i) => {
      sum += (key * Number(value[i]));
    });

    // 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
    // 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
    return _validatorHandler('BN', 10 - (sum + Math.floor(keys[8] * Number(value[8]) / 10)) % 10 == Number(value[9]));
  },

  /**
   * @param {any} equalValue eqaul value
   */
  equal(equalValue) {
    return (value) => {
      return _validatorHandler('equal', equalValue === value ? true : false);
    };
  },

  /**
   * @param {RegExp | string} pattern Regexp pattern
   */
  pattern(pattern) {
    return (value) => {
      return _validatorHandler('pattern', new RegExp(pattern).test(value + ''));
    };
  },

  /**
   * @param {Object} type JavaScript Primitive Type
   */
  type(type)  {
    return (value) => {
      return _validatorHandler('type', value instanceof type || typeof value === (type.name).toLowerCase());
    }
  }
};

/**
 * @param {ValidateControl} param0
 */
export function ValidatorControl({ value, validatorFns, errorMessage }) {
  let error = null;

  validatorFns.some(validatorFn => {
    if ((error = validatorFn(value))) {
      return true;
    }
  });

  return new Promise((resolve, reject) => {
    if (error) {
      error.message = errorMessage;

      reject(error);
    } else {
      resolve(error);
    }
  });
};

/**
 * @param {ValidateControl[]} validatorControls
 */
export function ValidatorControls(...validatorControls) {
  return Promise.all(validatorControls.map(vc => ValidatorControl(vc)))
    .catch(err => { throw err });
}
