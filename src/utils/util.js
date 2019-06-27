// url参数转json
export const urlToJson = (url = null) => {
  let json = {};
  if (!url) return json;

  let data = url.split("?")[1] ? url.split("?")[1].split("&") : [];
  for (let i = 0; i < data.length; i++) {
    let k = data[i].split("=");
    k[0] && (json[k[0]] = k[1] || "");
  }

  return json;
};
