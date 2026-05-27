const contador = {
  valor: 0,
  increment: function() {
    setInterval(()=> {
      this.valor++;
      console.log(this.valor);
    }, 1000);
  }
};
contador.increment(); // Muestra NaN o error
console.log(contador.valor);