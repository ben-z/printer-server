import path from 'path'

export default function(filepath){
  let filename = path.basename(filepath);
  let options = JSON.parse(filename.substring(0,filename.indexOf(']')+1).replace(/-/g,'"'))
  console.log(options)
}
