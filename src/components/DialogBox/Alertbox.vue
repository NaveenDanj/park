<template>
    <v-dialog v-model="show" @keydown.esc="handleOK" @keydown.enter="handleOK" persistent max-width="350">
        
        <v-card>

            <v-toolbar
                flat
                color="teal"
            >
                <v-icon class="white--text">mdi-information-outline </v-icon>
                <v-toolbar-title class="font-weight-light white--text ml-3 headline">
                    Alert
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text class="mt-5" style="font-size : 19px;">{{showError}}</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="handleOK">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name : 'AlertBox',
    props: ['showError' , 'show'],

    methods : {
        handleOK(){
            this.$emit('clickOK' , true);
        }
    }

}
</script>

<style>

</style>