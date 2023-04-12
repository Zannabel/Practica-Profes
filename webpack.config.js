//sirve para identificar la ruta de donde se encuentre este archivo
const path = require('path');

//Me permite trabajar con documentos HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Nos sirve para extraer el código css, minificarlo y optimizarlo. Ademas lo agrega como parte del head
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//Nos permite copiar archivos de una ruta a otra
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {

    // operadores en javascript, qué diferencia exite entre el operador =, == y el ===
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            index: './src/index.js', 
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [

                {
                    test: /\.css$/,
                    //corchetes es para varios elementos (lista)
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader' 
                    ]
                },
                {
                    test: /\.js$/,
                    inlude: path.resolve(__dirname, 'src/assets/js'),
                    // las llaves es para un elemento
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }

            ]
        },
        plugins: [],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            open: true,
            hot: true,
            watchFiles: [
                'src/**/*'
            ]
        }
    };

}