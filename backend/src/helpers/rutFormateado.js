const validarYFormatearRut = (rut) => {
  // Eliminar puntos y guiones del RUT y convertir a mayúsculas
  rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  // Separar el RUT de su dígito verificador
  const [rutSinDigitoVerificador, digitoVerificador] = [rut.slice(0, -1), rut.slice(-1)];

  // Validar el formato del RUT utilizando una expresión regular
  const rutRegex = /^[0-9]+$/;
  if (!rutRegex.test(rutSinDigitoVerificador)) {
    return null; // RUT no válido
  }

  // Formatear el RUT con puntos y guión
  let rutFormateado = '';
  let contador = 0;
  for (let i = rutSinDigitoVerificador.length - 1; i >= 0; i--) {
    contador++;
    rutFormateado = rutSinDigitoVerificador.charAt(i) + rutFormateado;
    if (contador % 3 === 0 && i !== 0) {
      rutFormateado = '.' + rutFormateado;
    }
  }

  // Agregar el dígito verificador al RUT formateado
  rutFormateado += '-' + digitoVerificador;

  return rutFormateado;
};

module.exports = validarYFormatearRut;
