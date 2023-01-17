const getBadgeColor = (statusCode: string) => {
  switch (statusCode) {
    case "pending":
      return "blue";
    case "processing":
      return "yellow";
    case "Delivered":
      return "green";
    case "cancelled":
      return "red";
    default:
      "gray";
  }
};

export default getBadgeColor;
