const makeSentenceCase = (args: string) => {
  return args.charAt(0).toUpperCase()  + args.slice(1);
};

export default makeSentenceCase;
