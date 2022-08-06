import moment from "moment";
const formatDateTime = (dateTime) => {
  return moment(dateTime).format("MMMM Do YYYY, h:mm:ss a");
};
const formatCurrency = (
  value,
  region = "en-In",
  style = "currency",
  currency = "INR"
) => {
  return new Intl.NumberFormat(region, {
    style,
    currency,
  }).format(value);
};

export default {
  formatDateTime,
  formatCurrency,
};
