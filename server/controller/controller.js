const { Todo } = require("../models");

const index = (req, res) => {};

const show_todos = async (req, res) => {
  try {
    const todos = Todo.findAll({
      where: { id: req.params.id },
    });

    if (todos) {
      // 전체 다 보여주기
      res.json({ result: true, message: "todo 목록" });
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
    });
    if (create) {
      res.json({ result: true, message: "todo 생성 성공" });
    }
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "todo 생성 실패" });
  }
};

const edit_todo = async (req, res) => {
  try {
    const { title } = req.body;
    const edit = await Todo.update({ title }, { where: { id } });
    if (edit) res.json({ result: true, message: "todo 수정 성공" });
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "todo 수정 실패" });
  }
};

const remove_todo = async (req, res) => {
  try {
    const { id } = req.body;
    const remove = await Todo.destroy({ where: { id } });
    if (remove) res.json({ result: true, message: "todo 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.json({ result: false, message: "todo 삭제 실패" });
  }
};

module.exports = {
  index,
  show_todos,
  create_todo,
  edit_todo,
  remove_todo,
};
