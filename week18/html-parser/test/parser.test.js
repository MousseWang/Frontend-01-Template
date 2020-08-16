import {parseHTML} from '../src/parser';
const assert = require('assert');

it('should add to numbers from an es module', () => {
  let body = parseHTML('<div></div>')
  let div = body.children[0]
  assert.strictEqual(div.children.length, 0);
  assert.strictEqual(div.type, 'element');
  assert.strictEqual(div.tagName, 'div');
  assert.strictEqual(div.attributes.length, 2);
});


it("Tag start end doesn't match!", () => {
  try{
    let div = parseHTML('<div></p>')
  } catch (e){
    assert.strictEqual(e.message, "Tag start end doesn't match!")
  }
});

it('token type is text', () => {
  let doc = parseHTML('<div>hello world</div>')
  let text = doc.children[0].children[0];

  assert.strictEqual(text.content, 'hello world');
  assert.strictEqual(text.type, 'text');
})

it('test <', function () {
  let doc = parseHTML('<div>a < b</div>');
  let text = doc.children[0].children[0];
  assert.strictEqual(text.content, 'a < b');
  assert.strictEqual(text.type, 'text');
});

it('with property', function () {
  let doc = parseHTML(`<div id=1 class='12' ></div>`);
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.strictEqual(attr.value, '1');
    }
    if (attr.name === 'class') {
      count++;
      assert.strictEqual(attr.value, '12');
    }
  }

  assert.ok(count === 2);
});

it('attribute no value', function () {
  let doc = parseHTML('<div id = ></div>');
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, '');
    }
  }

  assert.ok(count === 1);
});

it('with property2', function () {
  let doc = parseHTML(`<div id=a class='cls' data="abc"></div>`);
  let div = doc.children[0];

  let count = 0;

  for (const attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.strictEqual(attr.value, 'a');
    }
    if (attr.name === 'class') {
      count++;
      assert.strictEqual(attr.value, 'cls');
    }
    if (attr.name === 'data') {
      count++;
      assert.strictEqual(attr.value, 'abc');
    }
  }

  assert.ok(count === 3);
});

it('script', function () {
  let content = `
/script
<script
<
</
</s
</sc
</scr
</scri
</scrip
</script 
`;
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];

  assert.strictEqual(text.content, content);
  assert.strictEqual(text.type, 'text');
});

it('self closed single element', function () {
  let doc = parseHTML('<div/>');
  let div = doc.children[0];

  assert.strictEqual(div.tagName, 'div');
  assert.strictEqual(div.children.length, 0);
  assert.strictEqual(div.type, 'element');
  assert.strictEqual(div.attributes.length, 3);
});

it('uppercase tagname element', function () {
  let doc = parseHTML('<DIV/>');
  let div = doc.children[0];

  assert.strictEqual(div.tagName, 'DIV');
  assert.strictEqual(div.children.length, 0);
  assert.strictEqual(div.type, 'element');
  assert.strictEqual(div.attributes.length, 3);
});

it('multiple spaces single element', function () {
  let doc = parseHTML('<div     />');
  let div = doc.children[0];

  assert.strictEqual(div.tagName, 'div');
  assert.strictEqual(div.children.length, 0);
  assert.strictEqual(div.type, 'element');
  assert.strictEqual(div.attributes.length, 3);
});

it('empty tagname', function () {
  let doc = parseHTML('</>');
  let div = doc.children[0];

  assert.strictEqual(div.tagName, '');
  assert.strictEqual(div.children.length, 0);
  assert.strictEqual(div.type, 'element');
  assert.strictEqual(div.attributes.length, 3);
});
