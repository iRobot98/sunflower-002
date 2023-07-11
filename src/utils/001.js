const removeDuplicates = (list = []) => {
    const done = [];
    return list.filter((v) => {
      if (done.includes(v)) return false;
      done.push(v);
      return true;
    });
  };
  
  const splitUrl = (url_ = "/") => {
    const a = url_.split("/");
    const b = a.pop();
    const ext = b.split(".").pop();
    return {
      url_,
      split: a,
      last: b,
      ext,
    };
  };
  
  // resolves after a prespecified period of time
  const wait = async (time_in_s = 1) => {
    await new Promise((resolve, r) => {
      setTimeout(() => resolve(), time_in_s * 1000)
    })
  }
  
  
  const wait_loop = (num = 10) => {
    wait(num).then(wait_loop)
  }
  
  module.exports = {
    removeDuplicates,
    splitUrl,
    wait, wait_loop
  };