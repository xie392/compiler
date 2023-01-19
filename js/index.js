const default_value = `#include <stdio.h>

int main()
{
  int a = 1,b = 2;
  return 0;
}
`

const text = document.getElementById('text')
text.value = default_value

const tokenizer = document.getElementById('tokenizer')
const parser = document.getElementById('parser')
const animate = document.getElementById('animate')

const code = document.querySelector('.item-code')

const output = (inp) => {
  code.appendChild(document.createElement('pre')).innerHTML = inp
}

const syntaxHighlight = (json) => {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\u[a-zA-Z0-9]{4}|\[^u]|[^\"])*"(s*:)?|b(true|false|null)b|-?d+(?:.d*)?(?:[eE][+-]?d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

const remove = () => {
  Array.from(code.children).map(v => {
    if (v.nodeName === 'PRE') {
      v?.remove()
    }
  })
}

// 词法分析
tokenizer.onclick = () => {
  let tokens = null
  ctxClear()
  try {
    let c = new Compiler("C", text.value)
    tokens = c.tokenizer()
    remove()
    for (let i = 0; i < tokens.length; i++) {
      output(syntaxHighlight(JSON.stringify(tokens[i])))
    }
  }
  catch (err) {
    remove()
    output(err.message)
  }
}

// 语法分析
parser.onclick = () => {
  let ast = null
  ctxClear()
  try {
    let c = new Compiler("C", text.value)
    ast = c.parser()
    remove()
    output(syntaxHighlight(JSON.stringify(ast, null, 2)))
  }
  catch (err) {
    remove()
    output(err.message)
  }
}

const option = { id: "canvas", w: 600, h: 600 }
const ctx = canvas(option)

const ctxClear = () => {
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.fillRect(0, 0, option.w, option.h);
  ctx.closePath();
}

// 动画生成
animate.onclick = () => {

  remove()
  // const option = { id: "canvas", w: 600, h: 600 }
  // const ctx = canvas(option)

  for (var i = 1; i < option.w / 10; i++) {
    // 横线
    var dataline = new Canvas({
      canvas: ctx,
      line: [
        [0, 10 * i],
        [option.w, 10 * i]
      ],
      strokeStyle: "#d9d9d9"
    })
    dataline._init('line');

    // 纵线
    var dataline1 = new Canvas({
      canvas: ctx,
      line: [
        [10 * i, 0],
        [10 * i, option.w]
      ],
      strokeStyle: "#d9d9d9"
    })
    dataline1._init('line');
  }

}
