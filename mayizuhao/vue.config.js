// 获取命令行指令
const configArgv = JSON.parse(process.env.npm_config_argv);
console.log(configArgv)
// 截取
const original = configArgv.original.slice(1);
console.log(original)
// 截取参数
const stage = original[1] ? original[1].replace(/-/g, "") : "dev";
console.log(stage)

module.exports = {
	productionSourceMap: false
}