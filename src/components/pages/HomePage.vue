<template>
  <GridLayout rows="auto, *">
    <SearchBar
      row="0"
      hint="Search mutual funds..."
      v-model="searchTerm"
      @submit="onSearch"
      class="search-bar"
    />
    <ScrollView row="1">
      <StackLayout class="home">
        <Label text="Welcome to NAVigator" class="title" />
        <Label text="Your comprehensive platform for analyzing mutual funds" class="subtitle" />
        
        <GridLayout rows="auto, auto" columns="*, *" class="features">
          <StackLayout row="0" col="0" class="feature-card">
            <Label text="📈" class="emoji" />
            <Label text="Performance Tracking" class="feature-title" />
            <Label text="Monitor NAV trends and historical performance" class="feature-desc" />
          </StackLayout>
          
          <StackLayout row="0" col="1" class="feature-card">
            <Label text="📊" class="emoji" />
            <Label text="Fund Comparison" class="feature-title" />
            <Label text="Compare multiple schemes side by side" class="feature-desc" />
          </StackLayout>
          
          <StackLayout row="1" col="0" class="feature-card">
            <Label text="💰" class="emoji" />
            <Label text="SIP Calculator" class="feature-title" />
            <Label text="Plan your investments better" class="feature-desc" />
          </StackLayout>
          
          <StackLayout row="1" col="1" class="feature-card">
            <Label text="📱" class="emoji" />
            <Label text="Mobile First" class="feature-title" />
            <Label text="Access anywhere, anytime" class="feature-desc" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    onSearch() {
      // Navigate to search page with term
      this.$navigateTo(SearchPage, {
        props: { initialSearch: this.searchTerm }
      });
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20;
}
.title {
  font-size: 24;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10;
}
.subtitle {
  font-size: 16;
  text-align: center;
  color: #666;
  margin-bottom: 30;
}
.features {
  margin-top: 20;
}
.feature-card {
  padding: 15;
  margin: 5;
  background-color: #ffffff;
  border-radius: 10;
}
.emoji {
  font-size: 32;
  text-align: center;
}
.feature-title {
  font-weight: bold;
  text-align: center;
  margin-top: 10;
}
.feature-desc {
  text-align: center;
  font-size: 12;
  color: #666;
  margin-top: 5;
}
</style>