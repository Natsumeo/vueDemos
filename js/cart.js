var goodsObj = [
        {
		name: '不二家糖果屋',
		checked: false,
		list: [
		  {
				name: '咖啡奶糖',
				price: 23.00,
				realStock: 10,
				fare: 1.5,
				num: 10,
				checked: false,
			},
			{
				name: '椰汁奶糖',
				price: 21.00,
				realStock: 2,
				fare: 1.5,
				num: 2,
				checked: false
			},
			{
				name: '水果奶糖',
				price: 18.00,
				realStock: 8,
				fare: 1.5,
				num: 4,
				checked: false
			}
		]
	  },
	  {
		name: 'nide衣橱',
		checked: false,
		list: [{
				name: '一字肩裙',
				price: 166.00,
				realStock: 10,
				fare: 2,
				num: 1,
				checked: false,
			},
			{
				name: '佩奇短袖',
				price: 66.00,
				realStock: 2,
				fare: 1.5,
				num: 2,
				checked: false,
			},
			{
				name: '耐跑鞋',
				price: 299.00,
				realStock: 1,
				fare: 3,
				num: 1,
				checked: false,
			},
		]
	},
];
var vue = new Vue({
		el: 'body',
		data: {
			goodsObj: goodsObj,
			totalMoney: 0,
			totalFare: 0,
			allChecked: false
		},
		ready: function() {},
		methods: {
			//全部商品全选
			chooseAllGoods: function() {
				var flag = true;
				if(this.allChecked) {
					flag = false;
				}
				for(var i = 0, len = this.goodsObj.length; i < len; i++) {
					this.goodsObj[i]['checked'] = flag;
					var list = this.goodsObj[i]['list'];
					for(var k = 0, len1 = list.length; k < len1; k++) {
						list[k]['checked'] = flag;
					}
				}
				this.allChecked = !this.allChecked;
				this.calTotalMoney();
				this.calTotalFare();
			},
			//每个店铺全选
			chooseShopGoods: function(index) {
				var list = this.goodsObj[index]['list'],
					len = list.length;
				if(this.goodsObj[index]['checked']) {
					for(var i = 0; i < len; i++) {
						list[i]['checked'] = false;
					}
				} else {
					for(var i = 0; i < len; i++) {
						list[i]['checked'] = true;
					}
				}
				this.goodsObj[index]['checked'] = !this.goodsObj[index]['checked'];
				//判断是否选择所有商品的全选
				this.isChooseAll();
				this.cal(index);
			},
			//单个选择
			choose: function(index1, index) {
				var list = this.goodsObj[index1]['list'],
					len = list.length;
				if(list[index]['checked']) {
					this.goodsObj[index1]['checked'] = false;
					this.allChecked = false;
					list[index]['checked'] = !list[index]['checked'];
				} else {
					list[index]['checked'] = !list[index]['checked'];
					//判断是否选择当前店铺的全选
					var flag = true;
					for(var i = 0; i < len; i++) {
						if(list[i]['checked'] == false) {
							flag = false;
							break;
						}
					}
					flag == true ? this.goodsObj[index1]['checked'] = true : this.goodsObj[index1]['checked'] = false;
				}
				//判断是否选择所有商品的全选
				this.isChooseAll();
				this.cal(index);
			},
			//判断是否选择所有的商品的全选
			isChooseAll: function() {
				var flag1 = true;
				for(var i = 0, len = this.goodsObj.length; i < len; i++) {
					if(this.goodsObj[i]['checked'] == false) {
						flag1 = false;
						break;
					}
				}
				flag1 == true ? this.allChecked = true : this.allChecked = false;
			},
			//商品数量控制
			numChange: function(index1, index, numChange) {
				var goods = this.goodsObj[index1]['list'][index];
				oThis = this;
				if(numChange == 1) {
					goods.num++;
				} else if(numChange == -1) {
					goods.num--;
				}

				if(goods.num <= 1) {
					goods.num = 1;
				}
				if(goods.num >= goods.realStock) {
					goods.num = goods.realStock;
				}
				this.cal(index);
			},
			//用户填写容错处理
			numEntry: function(index1, index) {
				var goods = this.goodsObj[index1]['list'][index];
				if(goods.num <= 1) {
					goods.num = 1;
				}
				if(goods.num > goods.realStock) {
					goods.num = goods.realStock;
				}
				this.cal(index);
			},
			//计算每个店铺的商品的总额
			calEveryStore: function(index) {
				var everyStoreMoney = 0;
				list = this.goodsObj[index]['list'];
				list.forEach(function(item, index, arr) {
					if(list[index]['checked']) {
						everyStoreMoney += parseFloat(item.price) * parseFloat(item.num);
					}
				});
				return everyStoreMoney.toFixed(2);
			},
			//计算每个店铺的运费总额
			calEveryFare: function(index) {
				var everyStoreFare = 0;
				list = this.goodsObj[index]['list'];
				list.forEach(function(item, index, arr) {
					if(list[index]['checked']) {
						everyStoreFare += parseFloat(item.fare) * parseFloat(item.num);
					}
				});
				//toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
				return everyStoreFare.toFixed(2);
			},
			//计算商品总金额
			calTotalMoney: function() {
				var oThis = this;
				this.totalMoney = 0;
				for(var i = 0, len = this.goodsObj.length; i < len; i++) {
					var list = this.goodsObj[i]['list'];
					list.forEach(function(item, index, arr) {
						if(list[index]['checked']) {
							oThis.totalMoney += parseFloat(item.price) * parseFloat(item.num);
						}
					});
				}
			},
			//计算商品运费
			calTotalFare: function() {
				var oThis = this;
				this.totalFare = 0;
				for(var i = 0, len = this.goodsObj.length; i < len; i++) {
					var list = this.goodsObj[i]['list'];
					list.forEach(function(item, index, arr) {
						if(list[index]['checked']) {
							oThis.totalFare += parseFloat(item.fare) * parseFloat(item.num);
						}
					});
				}
			},
			//计算方法集合
			cal: function(index) {
				this.calEveryStore(index);
				this.calEveryFare(index);
				this.calTotalMoney();
				this.calTotalFare();
			},
			//删除操作
			delGoods: function(index1, index) {
				console.log(index1);
				console.log(index);
				//splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
				this.goodsObj[index1]['list'].splice(index, 1);
				this.cal(index);
			}
		}

	})