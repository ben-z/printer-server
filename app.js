import request from 'superagent'
import ipp from 'ipp'
import fs from 'fs'
import Options from './lib/options'
// import grayscale from './lib/grayscale'

// let o = new Options('some/path/to/[-color-,-duplex-]file.pdf')
// console.log(o.getOptions());
// console.log(o.isTrue('color'));

const path = 'Dropbox/PrinterServer'

function check_dropbox(){
  fs.readdir(path,(err,files)=>{
    if(err) throw err;
    files = files.filter(file=>fs.statSync(`${path}/${file}`).isFile());
    console.log(files);
    for(let i = 0, f; f=files[i];i++){
      fs.readFile(`${path}/${f}`,(err,buffer)=>{
        if(err) throw err;
	fs.rename(`${path}/${f}`,`${path}/printing/${f}`,err=>{
	  if(err) throw err;
	  console.log(`Printing ${f}`);
          print_file(buffer,res=>{
            fs.rename(`${path}/printing/${f}`,`${path}/completed/${f}`,err=>{
              if(err) throw err
            });
          });
        });
      })
    }
  })
}
setInterval(check_dropbox, 20000);

function print_file(buffer,callback){
  let printer = ipp.Printer("http://localhost:631/printers/EPSON_Stylus_CX4600")
  let msg = {
    "operation-attributes-tag": {
      "requesting-user-name": "puppy",
      "job-name": "My Test Job",
      "document-format": "application/pdf"
    },
    data: buffer
  };
  printer.execute("Print-Job", msg, (err, res)=>{
    if(err) console.log(err);
   // console.log(res);
    callback(res);
  });
}
