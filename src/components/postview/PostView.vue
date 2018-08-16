<template>
    <div class="post-view">
        <Row class="post-row">
            <Col class="post-col" span="6">
                <post-info></post-info>
                <left-view></left-view>
            </Col>
            <Col class="post-col" span="18">
                <right-view></right-view>
            </Col>
        </Row>
    </div>
</template>

<script>
import PostInfo from "./PostInfo";
import LeftView from "./LeftView";
import RightView from "./RightView";

export default {
    data () {
        return {

        }
    },
    components: {
        PostInfo,
        LeftView,
        RightView
    },
    methods: {
    }
}
</script>

<style lang="less">
.post-view{
    height: 100%;
    .post-row{
        height: 100%;
        .post-col{
            display: flex;
            flex-direction: column;
            height: 100%;
            border-right: 1px solid #e5e5e5;
        }
    }
}
</style>