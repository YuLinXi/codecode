export default function createElement(type, props, ...children) {
  const childElements = [].concat(...children).reduce((result, child) => {
    if (typeof child !== 'boolean' && child !== null) {
      if (Object.prototype.toString.call(child) === '[object Object]') {
        result.push(child);
      } else {
        result.push(createElement("text", { textContent: child }))
      }
    }
    return result;
  }, [])
  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements
  }
}