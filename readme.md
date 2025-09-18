
# ProInteligencia

Plataforma web desarrollada con Next.js y TypeScript para la gestión y visualización de inteligencia comercial, sectorial y de mercado. Incluye módulos para acceso a mercados, alertas comerciales, análisis de inversión extranjera, gestión de socios, productos y más.

## Características principales

- Dashboard interactivo y personalizable
- Módulos de acceso a mercados, alertas comerciales e IED
- Gestión de usuarios, socios, productos y publicaciones
- Integración con Google Analytics
- Estilos con Tailwind CSS y PostCSS
- Tipografías y recursos gráficos personalizados

## Estructura del proyecto

- `src/app/` - Páginas y layout principal
- `src/components/` - Componentes reutilizables por módulo
- `src/models/` - Modelos de datos TypeScript
- `src/services/` - Lógica de negocio y acceso a datos
- `src/state/` - Gestión de estado global
- `public/` - Recursos estáticos (imágenes, fuentes, SVG, videos)

## Instalación y desarrollo

1. Clona el repositorio:
	```bash
	git clone https://github.com/Prodominicana-dev/ProInteligencia.git
	cd ProInteligencia
	```
2. Instala las dependencias:
	```bash
	npm install
	# o
	yarn install
	```
3. Inicia el servidor de desarrollo:
	```bash
	npm run dev
	# o
	yarn dev
	```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue

El despliegue recomendado es en [Vercel](https://vercel.com/) o cualquier plataforma compatible con Next.js.

## Dependencias principales

- Next.js
- React
- TypeScript
- Tailwind CSS
- PostCSS

## Configuración adicional

- Edita `public/config.json` para parámetros personalizados.
- Las fuentes y gráficos se encuentran en `public/fonts` y `public/images`.

## Autores y licencia

Desarrollado por Prodominicana-dev. Para contribuciones, abre un issue o pull request.

Licencia: MIT
