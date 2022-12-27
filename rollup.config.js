import typescript from '@rollup/plugin-typescript';
import terser from "@rollup/plugin-terser";
export default  {
        input: 'src/index.ts',
        plugins: [typescript({  tsconfig: './tsconfig.json'}), terser()],
        output: [
            {
                file: "./dist/index.js",
                format: "cjs",
                exports: "auto",
            }
        ],
        external: ['react']
    };
