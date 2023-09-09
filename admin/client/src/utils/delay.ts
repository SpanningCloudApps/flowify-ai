export default (ms = 100): Promise<undefined> => new Promise(resolve => setTimeout(resolve, ms));
