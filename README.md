"#task-flow-mini-backend" 

# Arquitectura por capas
- config      # Conexion a BD
- models      #Schema de Mongo
- services    # Lógica de negocio, métodos a ejecutar
- controllers #Manejo de req/res
- routes      # Definición de los endpoins
- utils       # Funciones auxiliares
- middleware  # Auth, errores, validaciones
- app.js      # Configuración de express