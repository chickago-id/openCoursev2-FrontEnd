<template>
    <div>
        <el-menu background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item >
        <span>Mailbox</span>
      </el-menu-item>
                    </el-menu>
                    <el-menu
     
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <router-link to="/notification/index">
      <el-menu-item index="1">
        <i class="el-icon-message"></i>
         <span>Inbox</span>
      </el-menu-item>
      </router-link>
      <router-link to="/notification/sent">
      <el-menu-item index="2">
        <i class="el-icon-upload2"></i>
        <span>Sent</span>
      </el-menu-item>
      </router-link>
      <router-link to="/notification/draft">
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span>Draft</span>
      </el-menu-item>
      </router-link>
      <router-link to="/notification/trash">
      <el-menu-item index="4">
        <i class="el-icon-delete"></i>
        <span>Trash</span>
      </el-menu-item>
      </router-link>
    </el-menu>
    <br>
                    <el-menu background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item >
        <span>Notification</span>
      </el-menu-item>
                    </el-menu>
                    <el-menu
    
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <router-link to="/notification/important">
      <el-menu-item index="1">
        <i class="el-icon-message"></i>
        <span>Important Notice</span>
      </el-menu-item>
      </router-link>
      <router-link to="/notification/news">
      <el-menu-item index="2">
        <i class="el-icon-upload2"></i>
        <span>Info & News</span>
      </el-menu-item>
      </router-link>
      
    </el-menu>

      <!-- <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
   
    <el-table-column lprop="name" label="Your Mail"  width="160">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Name: {{ scope.row.name }}</p>
          <p>Addr: {{ scope.row.kelas }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column  prop="message" width="540">
         <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Date: {{ scope.row.date }}</p>
          <div slot="reference" class="name-wrapper">
            {{ scope.row.message }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
      </template> 
      <template slot-scope="scope" width="40">
         <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
           <el-button  type="danger" icon="el-icon-delete" circle size="mini"
          @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table> -->
                </div>
</template>

