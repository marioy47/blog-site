# Medir eventos tipo click con Google Analytics

Diferente si se 

Es diferente si se está usando la version anterior (`analytics.js`) o la nueva versión `gtags.js`.

Solo registrar lo que necesitamos para no afectar el performance del sitio.

## Definiciones

Tanto Categoría, Acción y Etiqueta se usan para agrupar la información. Valor es si queremos darle una valor a la transacción como costo de un producto.

Adicionalmente se debe enviar `send` y `event` como valores fijos.

En `analytics.js` (versión anterior):

```javascript {3}
ga(
  'send', 'event', 
  'category', 'action', 'label', value);
```

### Categoría

Para agrupar _objetos_ a los que queremos hacer seguimiento:

- _Suscripción Newsletter_
- _Formulario de Contacto_

### Acción

Para asignar un nombre al tipo de evento:

- _Enviar_

### Etiqueta

Información adicional como por ejemplo un identificador de formulario:

- _Formulario homepage_ 
- _Formulario página newsletter_

### Valor

Puede ser valor monetario si la acción representa un valor o una cotización.

## Ejemplo

Asumiendo que ya se tiene 

