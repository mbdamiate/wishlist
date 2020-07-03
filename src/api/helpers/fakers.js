module.exports = ({ faker }) => {
  const fullName = () => {
    const firstName = faker.name.firstName();
    const fullName = faker.name.lastName();
    return String().concat(firstName).concat(" ").concat(fullName);
  };

  const email = (firstName = null, lastName = null) => {
    if (!firstName || !lastName) {
      return faker.internet.email();
    } else {
      const [_, sufix] = faker.internet.email().split("@");
      return String()
        .concat(lastName.toLocaleLowerCase())
        .concat("_")
        .concat(firstName.toLocaleLowerCase())
        .concat("@")
        .concat(sufix);
    }
  };

  const UUID = () => {
    return faker.random.uuid();
  };

  return {
    email,
    fullName,
    UUID,
  };
};
