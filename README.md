# Tablero de Avisos SAP-PM · O&M GPM

Tablero web (GitHub Pages) de los avisos de mantenimiento SAP-PM del Gasoducto Francisco Pascasio Moreno (GPM): PC Tratayén, PC Salliqueló y los tramos del gasoducto.

## Qué muestra
- **Resumen**: avisos registrados, abiertos (por fase SAP), abiertos críticos (prioridad 0–1 o repercusión "fuera de servicio"), antigüedad de los abiertos, programación vencida y tiempo de resolución (mediana aviso → fin avería real, % cerrados dentro del fin deseado).
- **Abiertos por sector**: PC Tratayén, PC Salliqueló y Gasoducto, ordenados por prioridad y antigüedad.
- **Prioridad × sector** y **Prioridad × repercusión**: abiertos sobre total.
- **Gráficos**: altas y cierres por mes con la evolución de abiertos, antigüedad por prioridad, abiertos por fase SAP, avisos por sistema, por clase, equipos con más avisos (repetitividad) y tiempo de resolución por prioridad.
- **A depurar en SAP**: MECE sin fecha real, fecha real con aviso abierto en SAP, sin prioridad, fin real anterior al aviso y PTBO.
- **Planilla**: abiertos, todos o a depurar, con buscador y exportación a CSV.

Filtros: año, sector, sistema, equipo/objeto, clase y responsable. Chips por prioridad.

## Reglas
- **Abierto**: sin "Fin avería real". Inicio y fin deseado son de programación y no cierran el aviso.
- **Cerrado**: con "Fin avería real".
- **Anulado**: estatus PTBO (petición de borrado). Se excluye de abiertos e indicadores.
- **Excluidos**: los avisos "Relev. técnico trampas" y "Adquisición gas patrón" no se tienen en cuenta (lista `EXCLUIR` en `index.html`).
- **Programación vencida**: abierto con fin deseado anterior a hoy.
- **Sector y sistema** salen de la ubicación técnica: `OCTY` = PC Tratayén, `CCSA` = PC Salliqueló, `TERC-NKTS-AB/BC/CD/DE` = tramos del gasoducto. El sistema de planta sale de los dos primeros dígitos del segundo bloque (03 = MG, 06 = TC, 05 = separación, etc.). Los catálogos están al principio del `<script>` de `index.html` (`SIS_PLANTA`, `SIS_DUCTO`, `CLASES`, `PRIOS`, `STATUS`) y se editan ahí.

## Archivos
- `index.html`: el tablero, en un solo archivo.
- `Code.gs`: Apps Script que expone el Google Sheets como JSON.
- `logo-tgs.png`: logo.

## Fuente de datos
Google Sheets **AVISOS GPM**, una fila por aviso con las columnas de la bajada SAP: Fecha de aviso, Responsable, Clase aviso, N° Aviso, Prioridad, Repercusión, Inicio deseado, Fin deseado, Descripción, Orden, Ubicación tecnica, Denominación Objeto tecnico, Equipo, Fin Averia real, Estatus en sistema.

El tablero reconoce las columnas por nombre (sin importar acentos ni mayúsculas) y acepta fechas como fecha de Sheets o como texto `dd.mm.aaaa`.

## Puesta en marcha
1. En el Sheets: Extensiones > Apps Script. Pegar `Code.gs` (si la pestaña no se llama `AVISOS`, cambiar `HOJA` o dejar que tome la primera). Implementar como aplicación web (Ejecutar como: Yo · Acceso: Cualquier usuario) y copiar la URL `/exec`.
2. En `index.html`, completar `const FUENTE = { appsScriptUrl: "https://script.google.com/macros/s/.../exec", ... }`.
3. En GitHub: Settings > Pages > Deploy from branch `main` / root.

Si la URL de datos falla, el tablero usa la copia embebida y lo indica en el pie ("Fuente").

## Actualización
Pegar la nueva bajada de SAP sobre la pestaña, manteniendo los encabezados. El tablero se actualiza al recargar la página.
