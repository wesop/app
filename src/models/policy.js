class Policy {
  constructor({
    name = '',
    agreement = false,
    required = true
  }) {
    this.name = name;
    this.agreement = agreement;
    this.required = required;
  }
}

export default Policy

