const { Todo } = require("../models");

const show_todos = async (req, res) => {
  try {
    const todos = await Todo.findAll();

    if (todos) {
      // 전체 다 보여주기
      res.json({ result: true, todos, message: "todo 목록" });
    }
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "todo 목록 불러오기 실패" });
  }
};

const create_todo = async (req, res) => {
  try {
    const { title } = req.body;
    const create = await Todo.create({
      title,
      done: false, // 새로운 todo 항목 생성 시 done 값: false
    });
    if (create) {
      res.json({ result: true, todo: create, message: "todo 생성 성공" });
    }
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "todo 생성 실패" });
  }
};

const edit_todo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const { todoId } = req.params; // url에서 todoId 가져오기
    const edit = await Todo.update({ title, done }, { where: { id: todoId } });
    if (edit) res.json({ result: true, message: "todo 수정 성공" });
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "todo 수정 실패" });
  }
};

const remove_todo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const remove = await Todo.destroy({ where: { id: todoId } });
    if (remove) res.json({ result: true, message: "todo 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "todo 삭제 실패" });
  }
};

module.exports = {
  show_todos,
  create_todo,
  edit_todo,
  remove_todo,
};
