<template>
	<div class="release bc-f5f7f9">
		<div class="release-main white-radius wh-1300">
			<div class="release-bar"><h3>填写发布商品的信息资料</h3></div>
			<div class="release-sel form-label-12">
				<label>选择游戏</label>
				<ul class="sel-list">
					<li>
						<el-popover width="800" placement="bottom-start" v-model="popVisible">
							<div class="pop-game-cont">
								<ul class="llist">
									<li><el-radio @change="selGameCls('游戏_端游')" v-model="radioFro" label="1" border size="small">端游</el-radio></li>
									<li><el-radio @change="selGameCls('游戏_手游')" v-model="radioFro" label="2" border size="small">手游</el-radio></li>
								</ul>
								<ul class="clist">
									<li v-for="item in gameSGoods" :key="item.name" @click="selGames(item)">{{ item.name }}</li>
								</ul>
							</div>
							<el-button size="medium" slot="reference" class="border-right">{{ goodsName }} <i class="el-icon-edit"></i></el-button>
						</el-popover>
					</li>
					<li v-if="gameYGoods.length > 0">
						<el-select v-model="gameYGoodsPath" @change="selGameY" size="medium" class="border-right" placeholder="请选择">
							<el-option v-for="item in gameYGoods" :key="item.name" :label="item.name" :value="item.path" />
						</el-select>
					</li>
					<li v-if="gameEGoods.length > 0">
						<el-select v-model="gameEGoodsPath" size="medium" class="border-none" placeholder="请选择">
							<el-option v-for="item in gameEGoods" :key="item.name" :label="item.name" :value="item.path" />
						</el-select>
					</li>
				</ul>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-label-12">
				<el-form-item label="游戏账号" prop="gameAccount">
					<el-input v-model="ruleForm.gameAccount" size="small"></el-input>
				</el-form-item>
				<el-form-item label="游戏密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" size="small"></el-input>
				</el-form-item>
				<el-form-item label="确认游戏密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" size="small"></el-input>
				</el-form-item>
				<el-form-item label="商品标题" prop="goodsTitle">
					<el-input v-model="ruleForm.goodsTitle" maxlength="100" show-word-limit size="small" placeholder="商品标题中不可带有QQ号、微信号、手机号等一切联系方式，否则不予通过" class="w600"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" prop="goodsDes">
					<el-input type="textarea" v-model="ruleForm.goodsDes" :rows="5" maxlength="500" show-word-limit size="small" placeholder="帐号的简介：比如装备、英雄、皮肤、时装等"></el-input>
				</el-form-item>
				<el-form-item label="上号方式" prop="loginMethod">
					<el-checkbox v-model="ruleForm.loginMethod">上号器上号</el-checkbox>
				</el-form-item>
				<div class="release-bar"><h3>填写发布商品的信息资料</h3></div>
				<el-form-item label="图片上传" prop="uploadImg">
					<el-upload
						accept=".jpg,.jpeg,.png"
						action="https://jsonplaceholder.typicode.com/posts/"
						list-type="picture-card"
						:limit="10"
						:before-upload="beforeUpload"
						:on-success="uploadSuccess"
						:on-exceed="uploadExceed"
						:on-preview="uploadPictureCardPreview"
						:on-remove="uploadRemove">
						<i class="el-icon-plus"></i>
  						<div slot="tip" class="el-upload__tip">已上传图片<span class="color-success">{{ ruleForm.uploadImg.length }}</span>/10张，每张图片最大支持1M，仅支持jpg/jpeg/png格式</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="pic">
					</el-dialog>
				</el-form-item>

				<el-form-item label="输入框" prop="inputSBox">
					<el-input v-model.number="ruleForm.inputSBox" size="small" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="数字输入框" prop="inputNBox">
					<el-input v-model.number="ruleForm.inputNBox" size="small" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="选择框" prop="selectBox">
					<el-select v-model="ruleForm.selectBox" size="small" placeholder="请选择">
						<el-option v-for="item in gameOpt" :key="item.value" :label="item.value" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="单项选择" prop="radioBox">
					<el-radio v-model="ruleForm.radioBox" label="是">是</el-radio>
					<el-radio v-model="ruleForm.radioBox" label="否">否</el-radio>
				</el-form-item>

				<el-form-item label="其他" prop="otherInfo">
					<el-input type="textarea" v-model="ruleForm.otherInfo" maxlength="500" :rows="3" show-word-limit size="small" placeholder="请输入账号内以上未涉及到的信息（选填）"></el-input>
				</el-form-item>
				<div class="release-bar"><h3>商品价格设置</h3></div>
				<el-form-item label="出租单价" prop="unitPrice">
					<el-input v-model="ruleForm.unitPrice" size="small">
						<template slot="append">元/小时</template>
					</el-input>
				</el-form-item>
				<el-form-item label="包天" prop="aDayPrice">
					<el-input v-model="ruleForm.aDayPrice" size="small">
						<template slot="append">元/天</template>
					</el-input>
				</el-form-item>
				<el-form-item label="起租时间" prop="minTimeLen">
					<el-input v-model.number="ruleForm.minTimeLen" size="small">
						<template slot="append">小时</template>
					</el-input>
					<span class="color-tip">最短可租用时长</span>
				</el-form-item>
				<el-form-item label="押金" prop="deposit">
					<el-input v-model="ruleForm.deposit" size="small">
						<template slot="append">元</template>
					</el-input>
					<span class="color-tip">温馨提示：不设置押金更容易出租。</span>
				</el-form-item>
				<div class="release-bar">
					<h3>确认联系方式<span>留下联系方式，客服能第一时间联系到您哦~</span></h3>
					<h4>*提醒：如您确认上架分享账号，即表示您已经考虑过相关风险，且自行承担相应结果。如发生封号、冻结情况，虚贝网会全程配合用户提供相关信息以及法律上的一些援助</h4>
				</div>
				<el-form-item label="手机" prop="phoneNumber" class="form-item-pt-20">
					<el-input v-model="ruleForm.phoneNumber" size="small"></el-input>
				</el-form-item>
				<el-form-item label="QQ" prop="QQNumber">
					<el-input v-model="ruleForm.QQNumber" size="small"></el-input>
				</el-form-item>
				<el-form-item prop="agreement">
					<el-checkbox v-model="ruleForm.agreement">我已经阅读相关协议<router-link to="/" class="color-success">《蚂蚁租号虚拟资产发布协议》</router-link></el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="submitForm('ruleForm')">立即发布</el-button>
					<el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		let numberPoint = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		let validateChkPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入新密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次密码输入不一致!'));
			} else {
				callback();
			}
		};
		let validateLoginMethod = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请选择上号方式'));
			} else {
				callback();
			}
		};
		let validateUnitPrice = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入出租单价'));
			} else if (!numberPoint.test(value)) {
				callback(new Error('请正确输入出租单价，最多可精确至小数点后两位'));
			} else {
				callback();
			}
		};
		let validateaDayPrice = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入包天价格'));
			} else if (!numberPoint.test(value)) {
				callback(new Error('请正确输入包天价格，最多可精确至小数点后两位'));
			} else {
				callback();
			}
		};
		let validateAgreement = (rule, value, callback) => {
			if (!value) {
				callback(new Error('请选择蚂蚁租号相关协议'));
			} else {
				callback();
			}
		};
		return {
			popVisible: false,
			goodsName: '选择游戏',
			radioFro: '1',
			gameSGoods: [],
			gameSGoodsPath: '',
			gameYGoods: [],
			gameYGoodsPath: '',
			gameEGoods: [],
			gameEGoodsPath: '',

			gameOpt: [],
			dialogImageUrl: '',
        	dialogVisible: false,
			ruleForm: {
				// 商品信息资料
				gameAccount: '',
				pass: '',
				checkPass: '',
				goodsTitle: '',
				goodsDes: '',
				loginMethod: false,

				uploadImg: [],
				inputNBox: '',
				selectBox: '',
				radioBox: '',
				otherInfo: '',
				// 商品价格、联系方式、协议
				unitPrice: '',
				aDayPrice: '',
				minTimeLen: '',
				deposit: '',
				phoneNumber: '',
				QQNumber: '',
				agreement: false
			},
			rules: {
				gameAccount: [
					{ required: true, message: '请输入游戏账号', trigger: 'blur'}
				],
				pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, validator: validateChkPass, trigger: 'blur' }
				],
				goodsTitle: [
					{ required: true, message: '请输入商品标题', trigger: 'blur' }
				],
				goodsDes: [
					{ required: true, message: '请输入商品描述', trigger: 'blur' }
				],
				loginMethod: [
					{ required: true, validator: validateLoginMethod, trigger: 'change' }
				],

				uploadImg: [
					{ required: true, message: '请上传游戏图片' }
				],
				inputSBox: [
					{ required: true, message: '请输入相关信息', trigger: 'blur' },
				],
				inputNBox: [
					{ required: true, message: '请输入相关信息', trigger: 'blur' },
					{ type: 'number', message: '此输入必须为整数', trigger: 'blur' }
				],
				selectBox: [
					{ required: true, message: '请选择相关信息', trigger: 'change' }
				],
				radioBox: [
					{ required: true, message: '请选择是或者否', trigger: 'change' }, 
				],

				unitPrice: [
					{ required: true, validator: validateUnitPrice, trigger: 'blur' }, 
				],
				aDayPrice: [
					{ required: true, validator: validateaDayPrice, trigger: 'blur' }, 
				],
				minTimeLen: [
					{ required: true, message: '请输入起租时间', trigger: 'blur' }, 
					{ type: 'number', message: '起租时间必须为整数', trigger: 'blur' }
				],
				agreement: [
					{ required: true, validator: validateAgreement, trigger: 'change' }
				]
			}
		}
	},
	created () {
		this.selGameCls('游戏_端游');
	},
	methods: {
		selGameCls (path) {
			this.$api.post('GetChildrenType', JSON.stringify(path))
				.then(res => {
					this.gameSGoods = res.obj;
				})
		},
		selGames (item, index) {
			this.goodsName = item.name;
			this.gameSGoodsPath = item.path;
			this.recode();
			this.$api.post('GetChildrenType', JSON.stringify(item.path))
				.then(res => {
					this.gameYGoods = res.obj;
				})
		},
		selGameY (path) {
			this.$api.post('GetChildrenType', JSON.stringify(path))
				.then(res => {
					this.gameEGoods = res.obj;
				})
		},
		beforeUpload (file) {
			console.log(file);
			if (file.size > 1024*1024) {
				this.$notify({
					title: '温馨提示',
					message: '单张图片最大仅限1M'
				});
				return false;
			}
		},
		uploadSuccess (res, file, fileList) {
			console.log(file, fileList);
			this.ruleForm.uploadImg.push(file.url);
		},
		uploadExceed () {
			this.$notify({
				title: '温馨提示',
				message: '最大只能上传10张图片'
			});
		},
		uploadRemove (file, fileList) {
			console.log(file, fileList);
		},
		uploadPictureCardPreview (file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.ruleForm)
				}
			});
		},
		resetForm (formName) {
			this.$refs[formName].resetFields();
		},
		// 重新赋值
		recode () {
			this.popVisible = false;
			this.gameYGoods = [];
			this.gameYGoodsPath = '';
			this.gameEGoods = [];
			this.gameEGoodsPath = '';
		}
    }
}
</script>

<style lang="scss" scoped>
	.release-main {
		padding: 15px;
		box-sizing: border-box;
	}
	.release-bar {
		position: relative;
		padding: 10px 0 10px;
		margin-bottom: 20px;
		border-bottom: 2px solid #e5e5e5;
		h3 {
			padding: 5px 8px;
			border-left: 6px solid #409EFF;
			font-size: 16px;
			span {
				margin-left: 15px;
				color: #666;
				font-size: 14px;
			}
		}
		h4 {
			position: absolute;
			bottom: -20px;
			left: 0;
			color: #F56C6C;
			font-size: 12px;
		}
	}
	.release-sel {
		display: flex;
		align-items: center;
		padding: 0 0 20px 90px;
		label {
			padding-right: 12px;
		}
		.el-select {
			margin-right: 20px;
		}
	}
	.sel-list {
		display: flex;
		flex-wrap: wrap;
		.el-select {
			width: 120px;
		}
		.el-button {
			overflow: hidden;
			max-width: 120px;
			height: 36px;
			margin-right: 20px;
			text-overflow: ellipsis;
		}
	}
	.pop-game-cont {
		.llist {
			display: flex;
			padding: 10px 0;
			border-bottom: 1px solid #eee;
			li {
				padding: 0 10px;
				cursor: pointer;
			}
		}
		.clist {
			display: flex;
			flex-wrap: wrap;
			overflow: auto;
			max-height: 300px;
			padding: 30px 0;
			li {
				width: calc(100% / 5);
				height: 40px;
				padding: 0 10px;
				box-sizing: border-box;
				cursor: pointer;
				&:hover {
					color: #409eff;
				}
			}
		}
	}
	.el-input, .el-select {
		width: 240px;
	}
	.el-textarea {
		width: 600px;
	}
	.w600 {
		width: 600px;
	}
	.w360 {
		width: 360px;
	}
	.w240 {
		width: 240px;
	}
	.w120 {
		width: 120px;
	}
	.color-success {
		padding: 0 3px;
		font-size: 14px;
		color: #409EFF;
	}
	.color-tip {
		margin-left: 10px;
		color: #F56C6C;
		font-size: 12px;
	}
	.form-item-pt-20 {
		padding-top: 20px;
	}
</style>
