'use strict'
const got = require('got');
const { request, gql } = require('graphql-request')

const abc = () => {
  

  (async () => {
    const {body} = await got.get('https://api.isevenapi.xyz/api/iseven/6/');

    console.log(body);
    //=> {hello: 'world'}
  })();
  return "hoge!"
}

module.exports = async function (fastify, opts) {
  fastify.post('/signin', async function (req, reply) {
    // signin ボタンで呼ばれる Hasura のアクションとそのコール先エンドポイント。
    // エンドポイントでは、パスワードをハッシュ化し、テーブルの値と比較。
    // jwt を生成し、レスポンスする。
    // （クライアントは、それを変数に保持する。）
    console.log(abc())

    return { root: true }
  })
  fastify.post('/signup', async function (req, reply) {
    // 作成するもの signup ボタンで呼ばれる Hasura のアクションとそのコール先エンドポイント。
    // エンドポイントでは、Hasura の users テーブルに、ユーザを作成。メールアドレス確認フラグは false 。
    // jwt の作成と、その jwt を入れたメールの送信。
    //
    // - メールアドレス確認用 jwt 案
    // ```json
    // {
    //   "iss": "murmur",
    //   "exp": Math.floor(new Date().getTime() / 1000) + (60 * 5),
    //   "sub": "yhiguchi@uhuru.jp",
    //   "iat": Math.floor(new Date().getTime() / 1000),
    //   "aud": "murmur.com"
    // }
    // ```

    const endpoint = 'http://localhost:18080/v1/graphql'
    const query = gql`
      mutation MyMutation($email: String = "") {
        insert_users_one(object: {email: $email}) {
          id
        }
      }
    `
    const variables = {
      email: 'yhiguchi+20210508@uhuru.jp'
    }
    
    const requestHeaders = {
      authorization: 'Bearer MY_TOKEN'
    }
    // request(endpoint, query, variables, requestHeaders).then((data) => console.log(data))
    const data = await request(endpoint, query, variables, requestHeaders)
    console.log(JSON.stringify(data, undefined, 2))

    return { root: true }
  })
  fastify.get('/verify', async function (req, reply) {
    // メール本文中のリンク http://localhost:3001/veirify?token={jwt} を受ける API の作成。
    // ここでは、jwt に含まれる情報から、ユーザ情報のメールアドレス確認フラグを true へ。
    // レスポンスヘッダーで、ログイン画面へ。

    return { root: true }
  })
}
