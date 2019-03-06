import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increment } from "../action";

// автоматом принимает текущее состояние стора, и возвращает то что мы хотим из стора достать, мы какбы описываем локальный state для текущего компонента, значениями которого будут значения из глобального стора
const mapStateToProps = (state) => {
  return {
    counter: state.count
  };
};

// автоматом принимает dispatch, и возвращает объект с функциями обработчиками, мы какбы описываем сдесь функции обработчики для текущего компонента, каждая функция обработчк вызывает соответсвующий экшен
const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrement: () => dispatch(increment())
  };
};

// мы описали две функции со стейтом и с обработчиками, внизу файла мы с помощью декоратора connect из react-redux соединяем компонент и этот стейт и обработчики, после чего внутри компонента доступ к этим свойствам и функциям доступен через props

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number,
    handleIncrement: PropTypes.func.isRequired
  };

  render() {
    const { counter, handleIncrement } = this.props;
    return (
      <div>
        <h2>{counter}</h2>
        <button onClick={handleIncrement}>Increment me</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
