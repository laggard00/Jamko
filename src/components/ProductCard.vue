<template>
    <div class="product-card">
        <div class="top">
            <div class="icon-placeholder"></div>
            <p>testtest2test2test2test22</p>
        </div>
        <div class="validity">
            <p>Vrijedi do </p>
            <div class="dot"></div>
        </div>
    </div>
</template> 

<style scoped>
.product-card{
    background-color: #EFE6E6;
    width: 280px;
    border-radius: 16px;
    padding: 16px;
    display:flex;
    flex-direction: column;
}
.top{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.validity{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;  
}
.icon-placeholder {
    width: 60px;
    height: 60px;
    background-color: #ccc;
    border-radius: 8px;
  }
.dot{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: green;
}
</style>