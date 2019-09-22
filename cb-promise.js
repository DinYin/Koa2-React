
const fs = require('fs');//（require）Node.js 自带的 fs 模块，并且把它赋值给 fs 变量
/** 
 * 方法1
 * node原生模块都是通过回掉的方式
 * fs.readFile(filename,[option],callback) 方法读取文件
 * */
fs.readFile('./package.json',(err, data) => {
  if(err){
    console.log(err)
    throw err;
  }
  console.log("data:", data); // 二进制, 这是原始二进制数据在缓冲区中的内容
  const resp = JSON.parse(data); // 转json
  console.log('name1:', resp.name);
})



/**
 * 方法2
 * promise方式，不用写回调
/**如果是老一点的node版本需要另外加入模块
 * const Promise = require('bluebird)
 */

function readFileAsync (url) {
  return new Promise((resolve, reject)=>{
    fs.readFile(url,(err, data) => {
      if(err){
        reject(err);
      }
      resolve(data);
    })
  })
}

readFileAsync('./package.json')
.then(data=> {
  const resp = JSON.parse(data); // 转json
  console.log('name2:', resp.name);
})
.catch(err => {
  console.log(err)
})

/**
 * 方法3
 * node进入8以后，有了封装了promise的util的模块
 */
const util = require('util');
util.promisify(fs.readFile)('./package.json')
  // .then(data => JSON.parse(data))
  .then(JSON.parse)
  .then(data => console.log('name3:',data.name))
  .catch(err => {
    console.log(err)
  })
  
  
  
  
  
  
  /**
   *  方法4
   * 利用已经封装好的util.promisify(fs.readFile)
   * async/await
   */
  const util = require('util');
  const readAsync= util.promisify(fs.readFile);
  async function init(){
    try {
      let data = await readAsync('./package.json');
      data = JSON.parse(data);
      console.log('name4:',data.name)
    } catch (err) {
      console.log(err)
    }
  }
  init();