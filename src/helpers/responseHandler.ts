const ResponseHandler = (
  response: any,
  responseName?: string | undefined,
  customMessage?: string | undefined
) => {
  if (!response) return `Something went wrong with ${responseName}`;
  if (response.status === 200 || response.status === 201) return;
  else if (
    typeof response?.error?.message === "string" ||
    typeof response?.message === "string"
  )
    return customMessage || response?.error?.message || response?.message;
  else return `Something went wrong with ${responseName}`;
};

export default ResponseHandler;
