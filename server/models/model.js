const { DataTypes } = require("sequelize");

const Todo = (sequelize) => {
  return sequelize.define(
    "todo",
    {
      //컬럼 정의
      id: {
        type: DataTypes.INTEGER,
        allowNull: false, //NOT NULL
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      done: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      // 테이블 이름을 복수형으로 변환하지 않도록 freezeTableName 옵션 설정
      freezeTableName: true,
    },
  );
};

module.exports = Todo;
