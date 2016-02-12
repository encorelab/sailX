export const uuid = () =>
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16))

export const shorten = (text, length) => {
  let t = text || ''
  console.log(t)
  if (t.length < length) { return t } else { return t.slice(0, length-3)+'...' }
}



