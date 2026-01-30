
# Nombre del proyecto: Challenge Task Backend
API REST para la gestión de tareas.


## Tecnologías Utilizadas

**Runtime**: Node.js 

**Language**: TypeScript

**Framework**: Express

**Serverless**: Firebase Cloud Functions

**Database**: Firestore

**Auth**: JWT Authentication

**Validation**: class-validator / class-transformer

**CI/CD**: GitHub Actions (CI/CD)


## Pasos de instalación

Step 1 - Instalar dependencias:

```bash
  cd functions
  npm install
```

Step 2 - Correr emulator:
```bash
  npm run serve
```

Step 3 - Verificar disponibilidad de la API:
  http://localhost:5001/<project-id>/us-central1/api

Step 4 - Despliegue manual
```bash
  npm run deploy
```

Step 5 - GitHub Actions se implementa automáticamente cuando se envía al flujo de trabajo  ubicado en la rama main:
  .github/workflows/deploy.yml

Step 6 - Configurar variables secrets:

  #Firebase
```bash
  firebase functions:secrets:set JWT_SECRET <your-secret>
```
