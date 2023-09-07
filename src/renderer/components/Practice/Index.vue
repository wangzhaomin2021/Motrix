<template>
  <el-container
    class="main panel"
    direction="horizontal"
  >
  <div style="height: 200px; width: 100%;background-color: skyblue;"></div>
  <el-input v-model="name" placeholder="请输入科目名称"></el-input>
  <el-button type="success" round @click="handleAddSubject">添加</el-button>
  </el-container>
</template>

<script>

  export default {
    name: 'zm-practice',
    data () {
      return {
        db: null,
        subjects: [],
        name: ''
      }
    },
    created () {
      const dbReq = indexedDB.open('question', 1)
      dbReq.onsuccess = e => {
        console.log('open db success', e)
        this.db = dbReq.result
        this.dbErrorListener()
      }
      dbReq.onerror = err => {
        console.log('open db fail', err)
      }
      dbReq.onupgradeneeded = e => {
        console.log('upgradeneeded', e)
        this.db = dbReq.result
        this.dbErrorListener()
        console.log('gggggggg', this.db, this.db.oldVersion)
        if (this.db.version === 1) {
          // 创建科目表
          const store = this.db.createObjectStore('subjects', {
            keyPath: 'id'
          })
          store.createIndex('name', 'name', { unique: false })
          store.createIndex('createTime', 'createTime', { unique: false })
          store.createIndex('updateTime', 'updateTime', { unique: false })
        }
      }
    },
    mounted () {

    },
    methods: {
      dbErrorListener () {
        this.db.onerror = err => {
          console.log('db error', err)
        }
      },
      handleAddSubject () {
        const now = Date.now()
        const subject = {
          id: now,
          name: this.name,
          createTime: now,
          updateTime: now
        }

        const transaction = this.db.transaction(['subjects'], 'readwrite')
        const store = transaction.objectStore('subjects')
        const req = store.add(subject)
        req.onsuccess = e => {
          this.$message.success('添加成功')
        }
        transaction.onComplete = e => {
          console.log('添加科目成功')
        }
        transaction.onerr = e => {
          console.log('添加科目失败', e)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.main {
  margin-top: 200px;
}
</style>
