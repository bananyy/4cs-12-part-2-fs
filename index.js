const fs = require('fs');

const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

console.log(1);
fs.writeFileSync('./text_sync.txt',text);
console.log(2);
fs.writeFile('./text_async.txt',text,(err,data)=>{
    console.log(3);
    if (err){
        console.error(err);
        return;
    }
});
console.log(4);

const row2 = "Dolore cillum in veniam consequat. Mollit magna aliquip duis adipisicing adipisicing nulla sunt mollit duis. Laboris ut in deserunt proident deserunt excepteur adipisicing id consequat aliquip ea do laborum. Deserunt proident ut commodo aute proident nostrud nulla ut. Sunt proident ea dolore voluptate consequat aliqua.";



fs.writeFileSync('./text_2.txt', `    ${text}\n    ${row2}`);

const a = 56;
const b = [67,56];
const c = {f: 45, g: { h:67}};
const d = [{f: 45, g: { h:67}}];
fs.writeFileSync('./text_variables.txt', `${a}\n${b}\n`);
fs.appendFileSync('./text_variables.txt', `${JSON.stringify(c)}\n${JSON.stringify(d)}`);
let copy_a, copy_b, copy_c, copy_d;
{
    const result = fs.readFileSync('./text_variables.txt');
    console.log(result);
    const result_text = result.toString();
    console.log(result_text);
    [copy_a, copy_b, copy_c, copy_d] = result_text.split('\n');
    copy_a = parseInt(copy_a);
    copy_b = copy_b.split(',').map(el => parseInt(el));
    copy_c = JSON.parse(copy_c);
    copy_d = JSON.parse(copy_d);
    console.log(`copy_a:${copy_a}`);
    console.log(`copy_b:${copy_b}`);
    console.log(`copy_c:`, copy_c);
    console.log(`copy_d:`, copy_d);

}

