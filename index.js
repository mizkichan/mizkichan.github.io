function newNode(node) {
  if (node instanceof Element) {
    return newElement(node);
  } else if (node instanceof Text) {
    return newText(node.data);
  } else if (node instanceof Comment) {
    return null;
  } else {
    throw new Error(node);
  }
}

function newElement(element) {
  const div = document.createElement("div");
  div.className = "element";
  div.appendChild(open(element));

  for (const childNode of element.childNodes) {
    const node = newNode(childNode);
    if (node == null) {
      continue;
    }
    div.appendChild(node);
  }

  div.appendChild(close(element));
  return div;
}

function open(element) {
  const attributes = [];
  for (const attribute of element.attributes) {
    attributes.push([attribute.name, attribute.value]);
  }

  const span = document.createElement("span");
  span.className = "element-open";
  span.appendChild(new Text(element.localName));
  for (const [name, value] of attributes) {
    span.appendChild(newAttribute(name, value));
  }
  return span;
}

function close(element) {
  const span = document.createElement("span");
  span.className = "element-close";
  span.innerText = element.localName;
  return span;
}

function newAttribute(name, value) {
  const span = document.createElement("span");
  span.className = "attribute";

  const attributeName = document.createElement("span");
  attributeName.className = "attribute-name";
  attributeName.innerText = name;
  span.appendChild(attributeName);

  if (value.length > 0) {
    const attributeValue = document.createElement("span");
    attributeValue.className = "attribute-value";
    attributeValue.innerText = value;
    span.appendChild(attributeValue);
  }

  return span;
}

function newText(text) {
  if (text.trim().length === 0) {
    return null;
  }
  const span = document.createElement("span");
  span.className = "text";
  span.innerText = text;
  return span;
}

// MAIN

const doctype = document.createElement("div");
doctype.className = "doctype";

const body = document.createElement("body");
body.appendChild(doctype);
body.appendChild(newElement(document.documentElement));
document.documentElement.replaceChild(body, document.body);

// vim: set ts=2 sw=2 et:
