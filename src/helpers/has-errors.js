export default (errors) => {
  return Object.keys(errors).some(key => errors[key]);
}