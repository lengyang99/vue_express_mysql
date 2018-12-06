// sql语句
export default sqlMap = {
  // 用户
  user: {
    add: 'insert into user(userName, age) values (?, ?)',
    query: 'SELECT * FROM `vue_data`.`user` ORDER BY `id` LIMIT 0, 1000',
    delete: 'delete from user where id = ?',
    update: 'update user set ? where id = ?',
  }
}
