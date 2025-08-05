import fs from 'fs'
import path from 'path'
function rewritePackagejson(projectPath){
    const packagePath = path.join(projectPath, 'package.json')
    const content = fs.readFileSync(packagePath, 'utf-8')
    const newContent = editedContent(content)
    fs.writeFileSync(packagePath, newContent)
}

function editedContent(content){
    let lastIndex = content.lastIndexOf('}')
    let str = content.slice(0, lastIndex)
    return `${str},\n"type": "module"\n}`
}

export default rewritePackagejson