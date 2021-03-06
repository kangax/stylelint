/* eslint-disable indent, no-multiple-empty-lines */

import {
  ruleTester,
  warningFreeBasics,
} from "../../../testUtils"
import rule, { ruleName, messages } from ".."

const testRule = ruleTester(rule, ruleName)

// 2 spaces
testRule(2, tr => {
warningFreeBasics(tr)

tr.ok(
`/* anything
    goes
\t\t\twithin a comment */
`)

// No enforcement if no newline
tr.ok(
`a { top: 0; } b { top: 1px; }`)
tr.ok(
`a {
  top: 0;
}
b { top: 1px; bottom: 4px; }`)
tr.ok(
`a {
  top: 0;
} b { top: 1px; }`
)

// Real checks ...

tr.ok(
`a {
  color: pink;
}`)

tr.ok(
`a { color: pink;
}`)

tr.ok(
`a {
  color: pink;
} b { top: 0; }`)

tr.ok(
`a { color: pink;
  top: 0; background: orange;
}`)

tr.ok(
`a {
  color: pink;
}


b {
  color: orange
}`)

tr.ok(
`a {
  color: pink;}`)

tr.ok(
`a {
  background-position: top left,
    top right,
    bottom left;
  color: pink;
}`)

tr.ok(
`a {
  background-position: top left,
    top right,
    bottom left
  ;
}`)

// Rule start/end errors
tr.notOk(
`\ta {
  color: pink;
}`,
{
  message: messages.expected("0 spaces"),
  line: 1,
  column: 2,
})

tr.notOk(
`a {
  color: pink;
  }`,
{
  message: messages.expected("0 spaces"),
  line: 3,
  column: 3,
})

tr.notOk(
`a,
b {
  color: pink;
  }`,
{
  message: messages.expected("0 spaces"),
  line: 4,
  column: 3,
})

tr.notOk(
`a { color: pink;
  }`,
{
  message: messages.expected("0 spaces"),
  line: 2,
  column: 3,
})

tr.notOk(
`a {
  color: pink
}
 b {
  color: orange
}`
, {
  message: messages.expected("0 spaces"),
  line: 4,
  column: 2,
})

tr.notOk(
`a {
  color: pink
}
b {
  color: orange
 }`,
{
  message: messages.expected("0 spaces"),
  line: 6,
  column: 2,
})

// Declaration errors
tr.notOk(
`a {
color: pink;
}`,
{
  message: messages.expected("2 spaces"),
  line: 2,
  column: 1,
})

tr.notOk(
`a {
\tcolor: pink;
}`,
{
  message: messages.expected("2 spaces"),
  line: 2,
  column: 2,
})

tr.notOk(
`a {
  color: pink;
 background: orange;
}`,
{
  message: messages.expected("2 spaces"),
  line: 3,
  column: 2,
})


tr.notOk(
`a {
  background-position: top left,
  top right,
    bottom left;
  color: pink;
}`,
{
  message: messages.expected("4 spaces"),
  line: 3,
  column: 1,
})

tr.notOk(
`a {
  background-position: top left,
    top right,
  bottom left;
  color: pink;
}`,
{
  message: messages.expected("4 spaces"),
  line: 4,
  column: 1,
})

// with * hack
tr.ok(
`a {
  *top: 1px;
}`
)

tr.ok(
`* { top: 0; }`
)

tr.ok(
`@media print {
  * { color: pink; }
}`
)

tr.notOk(
`@media print {
   * { color: pink; }
}`,
messages.expected("2 spaces"))

})

// tab
testRule("tab", tr => {
warningFreeBasics(tr)

tr.ok("")
tr.ok("a {color: pink;}")

tr.ok(
`a {
\tcolor: pink;
}`)

tr.ok(
`a {
\tcolor: pink;
}

b {
\tcolor: orange
}`)

tr.ok(
`a {
\tcolor: pink;}`)

// Rule start/end errors
tr.notOk(
`\ta {
\tcolor: pink;
}`,
{
  message: messages.expected("0 tabs"),
  line: 1,
  column: 2,
})

tr.notOk(
`a {
\tcolor: pink;
  }`,
{
  message: messages.expected("0 tabs"),
  line: 3,
  column: 3,
})

tr.notOk(
`a {
\tcolor: pink
}
 b {
\tcolor: orange
}`
, {
  message: messages.expected("0 tabs"),
  line: 4,
  column: 2,
})

tr.notOk(
`a {
\tcolor: pink
}
b {
\tcolor: orange
 }`,
{
  message: messages.expected("0 tabs"),
  line: 6,
  column: 2,
})

// Declaration errors
tr.notOk(
`a {
color: pink;
}`,
{
  message: messages.expected("1 tab"),
  line: 2,
  column: 1,
})

tr.notOk(
`a {
  color: pink;
}`,
{
  message: messages.expected("1 tab"),
  line: 2,
  column: 3,
})

tr.notOk(
`a {
\tcolor: pink;
 background: orange;
}`,
{
  message: messages.expected("1 tab"),
  line: 3,
  column: 2,
})

tr.notOk(
`a { color: pink;
top: 0; background: orange;
}`,
{
  message: messages.expected("1 tab"),
  line: 2,
  column: 1,
})

})

// 2 spaces except value
testRule(2, { except: ["value"] }, tr => {
warningFreeBasics(tr)

tr.ok(
`a {
  background-position: top left, top right, bottom left;
  color: pink;
}`)

tr.ok(
`a {
  background-position: top left,
  top right,
  bottom left;
  color: pink;
}`)

tr.notOk(
`a {
  background-position: top left,
    top right,
  bottom left;
  color: pink;
}`,
{
  message: messages.expected("2 spaces"),
  line: 3,
  column: 1,
})

tr.notOk(
`a {
  background-position: top left,
  top right,
    bottom left;
  color: pink;
}`,
{
  message: messages.expected("2 spaces"),
  line: 4,
  column: 1,
})

})

// 2 spaces ignore value
testRule(2, { ignore: ["value"] }, tr => {
warningFreeBasics(tr)

tr.ok(
`a {
  background-position: top left, top right, bottom left;
  color: pink;
}`)

tr.ok(
`a {
  background-position: top left,
  top right,
  bottom left;
  color: pink;
}`)

tr.ok(
`a {
  background-position: top left,
    top right,
  bottom left;
  color: pink;
}`)

tr.ok(
`a {
  background-position: top left,
  top right,
    bottom left;
  color: pink;
}`)

tr.notOk(
`\ta {
  color: pink;
}`,
{
  message: messages.expected("0 spaces"),
  line: 1,
  column: 2,
})

})
