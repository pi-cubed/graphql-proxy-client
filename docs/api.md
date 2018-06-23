## Members

<dl>
<dt><a href="#withAction">withAction</a></dt>
<dd><p>TODO docs</p>
</dd>
<dt><a href="#Action">Action</a> ⇒ <code>Component</code></dt>
<dd><p>Return component outputting the response of the GraphQL action.</p>
</dd>
<dt><a href="#ProxyProvider">ProxyProvider</a></dt>
<dd><p>TODO docs</p>
</dd>
</dl>

<a name="withAction"></a>

## withAction

TODO docs

**Kind**: global variable  
<a name="Action"></a>

## Action ⇒ <code>Component</code>

Return component outputting the response of the GraphQL action.

**Kind**: global variable  
**Returns**: <code>Component</code> - A list around the items.

| Param            | Type                                       | Description                     |
| ---------------- | ------------------------------------------ | ------------------------------- |
| props            | <code>Object</code>                        | The component props.            |
| props.url        | <code>string</code>                        | The GraphQL api endpoint.       |
| props.action     | <code>string</code>                        | The GraphQL action.             |
| [props.schema]   | <code>GraphQLSchema</code>                 | The schema for the GraphQL api. |
| [props.onChange] | [<code>onChange</code>](#Action..onChange) | The data change handler.        |
| props.client     | <code>ApolloClient</code>                  | The Apollo client.              |

**Example** _(Display users&#x27; names from GraphQL API)_

```js
<Action
  url="https://us1.prisma.sh/dylan-richardson-59e89b/hew/dev"
  action={'query Q { users { name } }'}
>
  <Put />
</Action>
```

<a name="Action..onChange"></a>

### Action~onChange : <code>function</code>

This callback handles Action change events.

**Kind**: inner typedef of [<code>Action</code>](#Action)

| Param | Type            |
| ----- | --------------- |
| value | <code>\*</code> |

<a name="ProxyProvider"></a>

## ProxyProvider

TODO docs

**Kind**: global variable
