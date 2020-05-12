let that;
// 抽取 Tab 對象
class Tab {
    constructor(id) {
            // 接
            that = this;
            // 獲取元素
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tab-add');
            // li 的父元素
            this.ul = this.main.querySelector('.nav ul:first-child');
            // section 的父元素
            this.fsection = this.main.querySelector('.tabs-content');
            this.init();
        }
        // 頁面加載完就先進行初始化綁定事件
    init() {
            this.updateNode();
            // init 初始化操作讓相關的元素綁定事件
            this.add.addEventListener('click', this.addTab);
            this.lis.forEach((li, i) => {
                this.lis[i].i = i;
                this.lis[i].addEventListener('click', this.toggleTab);
            })
        }
        // 獲取所有小 li 與 section
    updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
        }
        // 1. 切換功能
    toggleTab() {
            // 要的是 constructor 的 this
            that.clearClass();
            // console.log(this.i);
            // console.log(that.sections[this.i]);
            this.className = 'li-active';
            // console.log(this.sections[this.i])
            // this 指向被點擊的 li，裡面沒有 sections，所以會報錯
            // 我們要的是 constructor 裡面的 this.section，
            // 解決方式：在全域設定變數(that)接
            // this.sections[this.i].className = 'content-active';
            that.sections[this.i].className = 'content-active';

        }
        // 清除所有 li 與 section 的 CSS class
    clearClass() {
            this.lis.forEach((li, i) => {
                li.className = '';
                this.sections[i].className = '';
            })
        }
        // 2. 添加功能
    addTab() {
            that.clearClass();
            // step1: 創建 li 和 section
            let li = '<li class="li-active"><span>新選項卡</span><span class="iconfont icon-guanbi"></span></li>';
            let section = '<section class="content-active">gfg</section>';
            // step2: 塞入對應的容器
            // this.add 調用的，所以 this 指向 this.add，而 this.add 裡沒有 ul
            // this.ul.insertAdjacentHTML('beforeend', li);
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        // 3. 刪除功能
    removeTab() {}
        // 4. 修改功能
    editTab() {}
}

new Tab('#tab');