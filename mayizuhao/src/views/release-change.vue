<template>
	<div class="release bc-f5f7f9">
		<div class="release-main white-radius wh-1300">
			<div class="release-bar"><h3>信息资料修改</h3></div>
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
						<el-select v-model="gameEGoodsPath" @change="selGameE" size="medium" class="border-none" placeholder="请选择">
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
				<el-form-item label="角色名称" prop="gameRole">
					<el-input v-model="ruleForm.gameRole" size="small"></el-input>
				</el-form-item>
				<el-form-item label="商品标题" prop="goodsTitle">
					<el-input v-model="ruleForm.goodsTitle" maxlength="100" show-word-limit size="small" placeholder="商品标题中不可带有QQ号、微信号、手机号等一切联系方式，否则不予通过" class="w600"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" prop="goodsDes">
					<el-input type="textarea" v-model="ruleForm.goodsDes" :rows="5" maxlength="500" show-word-limit size="small" placeholder="帐号的简介：比如装备、英雄、皮肤、时装等"></el-input>
				</el-form-item>
				<el-form-item label="图片上传" prop="uploadImg">
					<el-upload
						accept=".jpg,.jpeg,.png"
						list-type="picture-card"
						:action="upImgUrl"
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

				<!-- <el-form-item label="选择框" prop="selectBox">
					<el-select v-model="ruleForm.selectBox" size="small" placeholder="请选择">
						<el-option v-for="item in gameOpt" :key="item.value" :label="item.value" :value="item.value"></el-option>
					</el-select>
				</el-form-item> -->

				<div class="release-bar"><h3>商品价格修改</h3></div>
				<el-form-item label="出租单价" prop="unitPrice">
					<el-input v-model="ruleForm.unitPrice" size="small">
						<template slot="append">元/小时</template>
					</el-input>
				</el-form-item>
				<el-form-item label="最短租赁" prop="minTimeLen">
					<el-input v-model.number="ruleForm.minTimeLen" size="small">
						<template slot="append">小时</template>
					</el-input>
					<span class="color-tip">最短可租用时长，默认无限制。</span>
				</el-form-item>
				<el-form-item label="最长租赁" prop="maxTimeLen">
					<el-input v-model.number="ruleForm.maxTimeLen" size="small">
						<template slot="append">小时</template>
					</el-input>
					<span class="color-tip">最长可租用时长，默认无限制。</span>
				</el-form-item>
				<el-form-item label="押金" prop="deposit">
					<el-input v-model="ruleForm.deposit" size="small">
						<template slot="append">元</template>
					</el-input>
					<span class="color-tip">温馨提示：不设置押金更容易出租，默认无押金。</span>
				</el-form-item>
				<el-form-item label="是否包天" prop="aDayFlag">
					<el-radio v-model="ruleForm.aDayFlag" :label="true">是</el-radio>
					<el-radio v-model="ruleForm.aDayFlag" :label="false">否</el-radio>
				</el-form-item>
				<div class="release-bar">
					<!-- <h3>确认联系方式<span>留下联系方式，客服能第一时间联系到您哦~</span></h3> -->
					<h3>确认商品信息<span>为了避免帐号造成的问题，请核对相关信息，确保正确无误哦~</span></h3>
					<h4>*提醒：如您确认上架分享账号，即表示您已经考虑过相关风险，且自行承担相应结果。如发生封号、冻结情况，蚂蚁网会全程配合用户提供相关信息以及法律上的一些援助。</h4>
				</div>
				<!-- <el-form-item label="手机" prop="phoneNumber" class="form-item-pt-20">
					<el-input v-model="ruleForm.phoneNumber" size="small"></el-input>
				</el-form-item>
				<el-form-item label="QQ" prop="QQNumber">
					<el-input v-model="ruleForm.QQNumber" size="small"></el-input>
				</el-form-item> -->
				<el-form-item prop="agreement">
					<el-checkbox v-model="ruleForm.agreement">我已经阅读相关协议<router-link to="/" class="color-success">《蚂蚁租号虚拟资产发布协议》</router-link></el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
					<el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { upImgUrl } from '@/common/api'
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
		let validateUnitPrice = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入出租单价'));
			} else if (!numberPoint.test(value)) {
				callback(new Error('请正确输入出租单价，最多可精确至小数点后两位'));
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
			upImgUrl,
			popVisible: false,
			goodsName: '选择游戏',
			radioFro: '1',
			gameSGoods: [],
			gameSGoodsPath: '',
			gameYGoods: [],
			gameYGoodsPath: '',
			gameEGoods: [],
			gameEGoodsPath: '',
			gameAllGoodsPath: '',

			// gameOpt: [],
			dialogImageUrl: '',
        	dialogVisible: false,
			ruleForm: {
				gameAccount: '',
				pass: '',
				checkPass: '',
				gameRole: '',
				goodsTitle: '',
				goodsDes: '',
				uploadImg: [],
				// selectBox: '',

				unitPrice: '',
				minTimeLen: -1,
				maxTimeLen: -1,
				deposit: 0,
				aDayFlag: null,
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
				gameRole: [
					{ required: true, message: '请输入角色名称', trigger: 'blur'}
				],
				goodsTitle: [
					{ required: true, message: '请输入商品标题', trigger: 'blur' }
				],
				goodsDes: [
					{ required: true, message: '请输入商品描述', trigger: 'blur' }
				],
				uploadImg: [
					{ required: true, message: '请上传游戏图片' }
				],
				// selectBox: [
				// 	{ required: true, message: '请选择相关信息', trigger: 'change' }
				// ],

				unitPrice: [
					{ required: true, validator: validateUnitPrice, trigger: 'blur' }, 
				],
				minTimeLen: [
					{ required: true, message: '请输入最短租赁时间', trigger: 'blur' }, 
					{ type: 'number', message: '租赁时长须为整数', trigger: 'blur' }
				],
				maxTimeLen: [
					{ required: true, message: '请输入最长租赁时间', trigger: 'blur' }, 
					{ type: 'number', message: '租赁时长须为整数', trigger: 'blur' }
				],
				aDayFlag: [
					{ required: true, message: '请确认是否包天', trigger: 'change' }, 
				],
				agreement: [
					{ required: true, validator: validateAgreement, trigger: 'change' }
				]
			}
		}
	},
	created () {
		this.selGameCls('游戏_端游');
		this.$api.post('GetGoodBaseInfo', this.$route.query.goodsCode)
			.then(res => {
				let _data = res.obj;
				this.gameAllGoodsPath = _data.goodPath;
				this.goodsName = _data.goodPath.split('_')[2];
				this.ruleForm.gameAccount = _data.accountName;
				this.ruleForm.pass = _data.accountPwd;
				this.ruleForm.checkPass = _data.accountPwd;
				this.ruleForm.gameRole = _data.roleName;
				this.ruleForm.goodsTitle = _data.title;
				this.ruleForm.goodsDes = _data.summary;
				this.ruleForm.deposit = _data.deposit;
			});
		this.$api.post('GetGoodImage', this.$route.query.goodsCode)
			.then(res => {
				this.ruleForm.uploadImg = res.obj.imageUrl;
			});
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
			this.gameAllGoodsPath = item.path;
			this.recode();
			this.$api.post('GetChildrenType', JSON.stringify(item.path))
				.then(res => {
					this.gameYGoods = res.obj;
				})
		},
		selGameY (path) {
			this.gameAllGoodsPath = path;
			this.$api.post('GetChildrenType', JSON.stringify(path))
				.then(res => {
					this.gameEGoods = res.obj;
				})
		},
		selGameE (path) {
			this.gameAllGoodsPath = path;
		},
		beforeUpload (file) {
			if (file.size > 1024*1024) {
				this.$notify({
					title: '温馨提示',
					message: '单张图片最大仅限1M'
				});
				return false;
			}
		},
		uploadExceed () {
			this.$notify({
				title: '温馨提示',
				message: '最大只能上传10张图片'
			});
		},
		uploadSuccess (res, file, fileList) {
			this.ruleForm.uploadImg.push(file.url);
		},
		uploadRemove (file, fileList) {
			let _index = this.ruleForm.uploadImg.indexOf(file.url);
			if (_index > -1) this.ruleForm.uploadImg.splice(_index, 1);
		},
		uploadPictureCardPreview (file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$api.post('UpdateGoodBaseInfo', {
						code: this.$route.query.goodsCode,
						goodPath: this.gameAllGoodsPath,
						accountName: this.ruleForm.gameAccount,
						accountPwd: this.ruleForm.pass,
						roleName: this.ruleForm.gameRole,
						title: this.ruleForm.goodsTitle,
						summary: this.ruleForm.goodsDes,
						deposit: this.ruleForm.deposit
					}).then(res => {
						// ...
					});
					this.$api.post('UpdateGoodImage', {
						code: this.$route.query.goodsCode,
						imageUrl: this.ruleForm.uploadImg
					}).then(res => {
						// ...
					})
					this.$api.post('UpdateGoodPrice', {
						code: this.$route.query.goodsCode,
						price: this.ruleForm.unitPrice,
						minCount: this.ruleForm.minTimeLen,
						maxCount: this.ruleForm.maxTimeLen,
						baotianFlag: this.ruleForm.aDayFlag,
						space: 1
					}).then(res => {
						// ...
					})
					this.$api.post('SetGoodState', {
						code: this.$route.query.goodsCode,
						state: 1
					}).then(res => {
						// ...
					})
					this.$notify({
						title: '温馨提示',
						message: '商品已提交审核，请耐心等待。'
					});
					this.$router.push({path: '/account/seller-account-manage', query: {accountPath: '/account/seller-account-manage'}});
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
		margin-bottom: 25px;
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
