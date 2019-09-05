<template>
	<div class="release bc-f5f7f9">
		<div class="release-main white-radius wh-1300">
			<div class="release-bar"><h3>填写发布商品的信息资料</h3></div>
			<div class="release-sel form-label-12">
				<label>选择游戏</label>
				<el-select v-model="gameVal" size="small" placeholder="请选择游戏">
					<el-option v-for="item in gameOpt" :key="item.value" :label="item.value" :value="item.value"></el-option>
				</el-select>
				<el-cascader v-model="zoneVal" :options="zoneOpt" size="small" placeholder="请选择" class="w240"></el-cascader>
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
				<div v-if="gameType == '英雄联盟'">
					<el-form-item label="角色等级" prop="LOLlevel">
						<el-input v-model.number="ruleForm.LOLlevel" size="small" placeholder="请输入角色等级"></el-input>
					</el-form-item>
					<el-form-item label="单双排段位" prop="LOLRK">
						<el-select v-model="ruleForm.LOLRK" size="small" placeholder="请选择单双排段位">
							<el-option
								v-for="item in gameOpt"
								:key="item.value"
								:label="item.value"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="灵活组排段位" prop="LOLFRK">
						<el-select v-model="ruleForm.LOLFRK" size="small" placeholder="请选择灵活组排段位">
							<el-option
								v-for="item in gameOpt"
								:key="item.value"
								:label="item.value"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="段位框" prop="LOLRB">
						<el-select v-model="ruleForm.LOLRB" size="small" placeholder="请选择段位框">
							<el-option
								v-for="item in gameOpt"
								:key="item.value"
								:label="item.value"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="角色数量" prop="LOLCN">
						<el-input v-model.number="ruleForm.LOLCN" size="small" placeholder="请输入角色数量"></el-input>
					</el-form-item>
					<el-form-item label="皮肤数量" prop="LOLSkin">
						<el-input v-model.number="ruleForm.LOLSkin" size="small" placeholder="请输入皮肤数量"></el-input>
					</el-form-item>
					<el-form-item label="点券数量" prop="LOLDQ">
						<el-input v-model.number="ruleForm.LOLDQ" size="small" placeholder="请输入点券数量"></el-input>
					</el-form-item>
					<el-form-item label="排位赛" prop="LOLRK">
						<el-radio v-model="ruleForm.LOLRK" label="允许">允许</el-radio>
						<el-radio v-model="ruleForm.LOLRK" label="不允许">不允许</el-radio>
					</el-form-item>
				</div>
				<div v-if="gameType == '穿越火线'">
					<el-form-item label="王者级道具数量" prop="CFKN">
						<el-input v-model.number="ruleForm.CFKN" size="small" placeholder="请输入王者级道具数量"></el-input>
					</el-form-item>
					<el-form-item label="英雄级道具数量" prop="CFHR">
						<el-input v-model.number="ruleForm.CFHR" size="small" placeholder="请输入英雄级道具数量"></el-input>
					</el-form-item>
					<el-form-item label="人物角色" prop="CFrole">
						<el-input v-model="ruleForm.CFrole" maxlength="200" show-word-limit size="small" placeholder="请输入人物角色" class="w600"></el-input>
					</el-form-item>
					<el-form-item label="主武器" prop="CFPW">
						<el-input v-model="ruleForm.CFPW" maxlength="500" show-word-limit size="small" placeholder="请输入主武器" class="w600"></el-input>
					</el-form-item>
					<el-form-item label="副武器" prop="CFDW">
						<el-input v-model="ruleForm.CFDW" maxlength="200" show-word-limit size="small" placeholder="请输入副武器" class="w600"></el-input>
					</el-form-item>
					<el-form-item label="近身" prop="CFMW">
						<el-input v-model="ruleForm.CFMW" maxlength="500" show-word-limit size="small" placeholder="请输入近身" class="w600"></el-input>
					</el-form-item>
					<el-form-item label="投掷" prop="CFTW">
						<el-input v-model="ruleForm.CFTW" maxlength="500" show-word-limit size="small" placeholder="请输入投掷" class="w600"></el-input>
					</el-form-item>
					<el-form-item label="CF皮肤" prop="CFskin">
						<el-input v-model="ruleForm.CFskin" maxlength="500" show-word-limit size="small" placeholder="请输入CF皮肤" class="w600"></el-input>
					</el-form-item>
					<el-form-item label="道具" prop="CFDJ">
						<el-input v-model="ruleForm.CFDJ" maxlength="500" show-word-limit size="small" placeholder="请输入道具" class="w600"></el-input>
					</el-form-item>
					<el-form-item label="枪王排位等级" prop="CFQF">
						<el-select v-model="ruleForm.CFQF" size="small" placeholder="请选择枪王排位等级">
							<el-option
								v-for="item in gameOpt"
								:key="item.value"
								:label="item.value"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="套装" prop="CFsuit">
						<el-radio v-model="ruleForm.CFsuit" label="爆破装">爆破装</el-radio>
						<el-radio v-model="ruleForm.CFsuit" label="生化装">生化装</el-radio>
						<el-radio v-model="ruleForm.CFsuit" label="双全装">双全装</el-radio>
						<el-radio v-model="ruleForm.CFsuit" label="稀有武器">稀有武器</el-radio>
					</el-form-item>
					<el-form-item label="到时不下线" prop="CFoff">
						<el-radio v-model="ruleForm.CFoff" label="参与">参与</el-radio>
						<el-radio v-model="ruleForm.CFoff" label="不参与">不参与</el-radio>
					</el-form-item>
				</div>
				<div v-if="gameType == '地下城与勇士'">
					<el-form-item label="角色等级" prop="DNFlevel">
						<el-input v-model.number="ruleForm.DNFlevel" size="small" placeholder="请输入角色等级"></el-input>
					</el-form-item>
					<el-form-item label="DNF角色职业" prop="DNFZY">
						<el-select v-model="ruleForm.DNFZY" size="small" placeholder="请选择DNF角色职业">
							<el-option
								v-for="item in gameOpt"
								:key="item.value"
								:label="item.value"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否已设置仓库密码" prop="DNFstorage">
						<el-checkbox v-model="ruleForm.DNFstorage">确认已设置（未设置有可能会导致账号物品损失）</el-checkbox>
					</el-form-item>
					<el-form-item label="是否已设置二级密码" prop="DNFsecondary">
						<el-checkbox v-model="ruleForm.DNFsecondary">确认已设置（未设置有可能会导致账号物品损失）</el-checkbox>
					</el-form-item>
					<el-form-item label="是否已锁定贵重物品" prop="DNFbinding">
						<el-checkbox v-model="ruleForm.DNFbinding">确认已锁定（未锁定有可能会导致账号物品损失）</el-checkbox>
					</el-form-item>
					<el-form-item label="账号物品可交易" prop="DNFtrade">
						<el-radio v-model="ruleForm.DNFtrade" label="能">能</el-radio>
						<el-radio v-model="ruleForm.DNFtrade" label="不能">不能</el-radio>
					</el-form-item>
				</div>
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
		let validatePass2 = (rule, value, callback) => {
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
			gameType: '英雄联盟',
			gameVal: '',
			gameOpt: [
				{
					value: '地下城与勇士'
				}, {
					value: '英雄联盟'
				}, {
					value: 'QQ飞车'
				}
			],
			zoneVal: [],
			zoneOpt: [
				{
					value: '艾欧里亚',
					label: '艾欧里亚',
					children: [{
						value: '大师',
						label: '大师'
					}]
				}, {
					value: '班德尔城',
					label: '班德尔城'
				}, {
					value: '德玛西亚',
					label: '德玛西亚',
					children: [{
						value: '王者',
						label: '王者'
					}]
				}, 
			],
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
				otherInfo: '',
				// 英雄联盟
				LOLlevel: '',
				LOLRK: '',
				LOLFRK: '',
				LOLRB: '',
				LOLCN: '',
				LOLSkin: '',
				LOLDQ: '',
				LOLRK: '',
				// 穿越火线
				CFKN: '',
				CFHR: '',
				CFrole: '',
				CFPW: '',
				CFDW: '',
				CFMW: '',
				CFTW: '',
				CFskin: '',
				CFDJ: '',
				CFQF: '',
				CFsuit: '',
				CFoff: '',
				// 地下城与勇士
				DNFlevel: '',
				DNFZY: '',
				DNFstorage: false,
				DNFsecondary: false,
				DNFbinding: false,
				DNFtrade: '',
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
					{ required: true, validator: validatePass2, trigger: 'blur' }
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
				// 英雄联盟
				LOLlevel: [
					{ required: true, message: '请输入角色等级', trigger: 'blur' }, 
					{ type: 'number', message: '角色等级必须为整数', trigger: 'blur' }
				],
				LOLRK: [
					{ required: true, message: '请选择单双排段位', trigger: 'change' }
				],
				LOLFRK: [
					{ required: true, message: '请选择灵活组排段位', trigger: 'change' }
				],
				LOLRB: [
					{ required: true, message: '请选择段位框', trigger: 'change' }
				],
				LOLCN: [
					{ required: true, message: '请输入角色数量', trigger: 'blur' }, 
					{ type: 'number', message: '角色数量必须为整数', trigger: 'blur' }
				],
				LOLSkin: [
					{ required: true, message: '请输入皮肤数量', trigger: 'blur' }, 
					{ type: 'number', message: '皮肤数量必须为整数', trigger: 'blur' }
				],
				LOLDQ: [
					{ required: true, message: '请输入点劵数量', trigger: 'blur' }, 
					{ type: 'number', message: '点劵数量必须为整数', trigger: 'blur' }
				],
				LOLRK: [
					{ required: true, message: '请选择能否玩排位赛', trigger: 'change' }, 
				],
				// 穿越火线
				CFKN: [
					{ required: true, message: '请输入王者级道具数量', trigger: 'blur' }, 
					{ type: 'number', message: '道具数量必须为整数', trigger: 'blur' }
				],
				CFHR: [
					{ required: true, message: '请输入英雄级道具数量', trigger: 'blur' }, 
					{ type: 'number', message: '道具数量必须为整数', trigger: 'blur' }
				],
				CFrole: [
					{ required: true, message: '请输入人物角色', trigger: 'blur' }
				],
				CFPW: [
					{ required: true, message: '请输入主武器', trigger: 'blur' }
				],
				CFDW: [
					{ required: true, message: '请输入副武器', trigger: 'blur' }
				],
				CFMW: [
					{ required: true, message: '请输入近身', trigger: 'blur' }
				],
				CFTW: [
					{ required: true, message: '请输入投掷', trigger: 'blur' }
				],
				CFskin: [
					{ required: true, message: '请输入CF皮肤', trigger: 'blur' }
				],
				CFDJ: [
					{ required: true, message: '请输入道具', trigger: 'blur' }
				],
				CFQF: [
					{ required: true, message: '请选择枪王排位等级', trigger: 'change' }
				],
				CFsuit: [
					{ required: true, message: '请选择套装', trigger: 'change' }
				],
				CFoff: [
					{ required: true, message: '请选择是否参与', trigger: 'change' }
				],
				// 地下城与勇士
				DNFlevel: [
					{ required: true, message: '请输入角色等级', trigger: 'blur' }, 
					{ type: 'number', message: '角色等级必须为整数', trigger: 'blur' }
				],
				DNFZY: [
					{ required: true, message: '请选择DNF角色职业', trigger: 'change' }
				],
				DNFstorage: [
					{ required: true }
				],
				DNFsecondary: [
					{ required: true }
				],
				DNFbinding: [
					{ required: true }
				],
				DNFtrade: [
					{ required: true, message: '请选择账号物品可交易', trigger: 'change' }
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
	methods: {
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
				} else {
					console.log('error submit.');
					return false;
				}
			});
		},
		resetForm (formName) {
			this.$refs[formName].resetFields();
		}
    }
}
</script>

<style lang="scss" scoped>
	.release-main {
		padding: 15px;
		box-sizing: border-box;
	}
	.release-sel {
		padding: 0 0 20px 90px;
		label {
			padding-right: 12px;
		}
		.el-select {
			margin-right: 20px;
		}
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
