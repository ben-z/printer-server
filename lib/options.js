import path from 'path'

export default class {
  constructor(filepath){
    this.filepath = filepath;
    let filename = this.filename = path.basename(filepath);
    this.options = JSON.parse(filename.substring(0,filename.indexOf(']')+1).replace(/-/g,'"'))
  }
  getOptions(){
    return this.options;
  }
  isTrue(option){
    return this.options.indexOf(option) !== -1
  }
}
