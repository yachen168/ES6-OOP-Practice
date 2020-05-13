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
                this.remove[i].addEventListener('click', this.removeTab);
                this.spans[i].addEventListener('dblclick', this.editTab);
                this.sections[i].addEventListener('dblclick', this.editTab);
            })
        }
        // 需要重新獲取動態添加的元素
    updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon-remove');
            this.spans = this.main.querySelectorAll('.nav li span:first-child');
        }
        // 1. 切換功能
    toggleTab() {
            // 要的是 constructor 的 this
            that.clearClass();
            // console.log(this.i);
            // console.log(that.sections[this.i]);
            this.className = 'li-active';
            // console.log(this.sections[this.i])
            // this 指向被點擊的 li，裡面沒有 sections，會報錯
            // 我們要的是 constructor 裡面的 this.section，解決方式：在全域設定變數(that)接
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
            let li = '<li class="li-active"><span>新選項卡</span><span class="iconfont icon-remove"></span></li>';
            let section = '<section class="content-active">gfg</section>';
            // step2: 塞入對應的容器
            // this.add 調用的，所以 this 指向 this.add，而 this.add 裡沒有 ul
            // this.ul.insertAdjacentHTML('beforeend', li);
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        // 3. 刪除功能
    removeTab(e) {
            // 阻止冒泡觸發到父層 li 的點擊事件
            e.stopPropagation();
            let index = this.parentNode.i;
            console.log(index);
            // remove() 方法可直接刪除指定的元素
            that.lis[index].remove();
            that.sections[index].remove();
            // 刪除後再重新獲取元素
            that.init();
            // 當刪除的不是選定狀態的 li 時，原來的選中狀態保持不變
            if (document.querySelector('.li-active')) return;
            // 當刪除了選定狀態的 li 時，讓其前一個 li 變成選定狀態
            index--;
            // 無需鼠標觸發，即可調用點擊事件
            // 短路保護機制，第一個 index (0 - 1) = -1，但 lis 最小是 0，會報錯
            that.lis[index] && that.lis[index].click();
        }
        // 4. 修改功能
    editTab() {
        // 先獲取原先文字內容
        const str = this.innerHTML;
        // 禁止雙擊選中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 替換成文本框，並把原先內容賦值給它
        this.innerHTML = `<input type="text" value="${str}"/>`;
        // 文本框為 li 的第一個子元素
        const input = this.children[0];
        // 雙擊，文本框裡的文字自動處於選中狀態
        input.select();
        // 文本框沒 focus 時，把裡面的值給父層 span
        input.addEventListener('blur', function() {
                this.parentNode.innerHTML = this.value;
            })
            // 放開 enter 鍵時把文本框裡的值給父層的 span
        input.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                // this.parentNode.innerHTML = this.value;
                // 手動調用表單失去焦點事件
                this.blur();
            }
        })
    }
}

new Tab('#tab');