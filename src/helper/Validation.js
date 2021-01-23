export default (key, value) => {
  if (value == undefined) {
    return true;
  }
  const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  switch (key) {
    case "First":
      return value && value.length < 3;
    case "Last":
      return value && value.length < 3;
    case "Email":
      return emailregx.test(value) ? false : true;
    case "Password":
      return value && value.length < 8;
  }
};
