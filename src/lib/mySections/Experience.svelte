<script lang="ts">
    import type { Company } from '$lib';

    const experience: Company[] = $props();

    let scrollPos = 0;
    let cardWidth = 735;

    // Получаем ширину карточки после рендера
    function getCardWidth() {
        const card = document.querySelector('.card');
        return card?.clientWidth || 735; // Возвращаем дефолтное значение, если карточка не найдена
    }

    const scroll = (direction: 'left' | 'right') => {
        const container = document.querySelector('.experience-scroll-container');
        if (!container) return;

        // Обновляем ширину карточки перед скроллом
        cardWidth = getCardWidth() + 15; // + gap между карточками

        const maxScroll = container.scrollWidth - container.clientWidth;
        scrollPos = Math.max(
            0,
            Math.min(maxScroll, scrollPos + (direction === 'left' ? -cardWidth : cardWidth))
        );
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };
</script>

<div class="experience-block">
    <h2 class="title">[ Experience ]</h2>

    {#if experience.length === 0}
        <div class="empty-state">
            <enhanced:img
                src="/static/images/UFONotFound.png"
                width="80px"
                height="80px"
                alt="No experience"
            />
            <div>Experience not found</div>
        </div>
    {:else}
        <div class="container">
            <button aria-label="left button" class="nav-btn nav-btn--left" onclick={() => scroll('left')}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
            </button>

            <div class="experience-scroll-container">
                {#each experience as { companyName, companyDescription, position, period }}
                    <article class="card">
                        <header>
                            <div>
                                <div class="company">{companyName}</div>
                                <div class="position">{position}</div>
                            </div>
                            <time class="period">{period}</time>
                        </header>
                        <p class="desc">{companyDescription}</p>
                    </article>
                {/each}
            </div>

            <button aria-label="right button" class="nav-btn nav-btn--right" onclick={() => scroll('right')}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
            </button>
        </div>
    {/if}
</div>

<style>
    .experience-block {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .title {
        margin: 5px 0 15px 10px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffebe0;
    }

    .container {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
    }

    .experience-scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        gap: 15px;
        padding: 20px 0;
        scrollbar-width: none;
        width: 100%;
    }

    .experience-scroll-container::-webkit-scrollbar {
        display: none;
    }

    .nav-btn {
        background: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: grid;
        flex-shrink: 0;
        place-items: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 10;
    }

    .container:hover .nav-btn {
        opacity: 0.8;
    }

    .nav-btn:hover {
        background: #f5f5f5;
        opacity: 0.8 !important;
    }

    .nav-btn--left {
        left: 10px;
    }

    .nav-btn--right {
        right: 10px;
    }

    .card {
        padding: 15px 5%;
        background: rgba(51, 69, 161, 0.2);
        border: 1px solid #3b3b8a;
        border-radius: 8px;
        color: white;
        flex-shrink: 0;
        width: 100%;
    }

    .card header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .company {
        font-weight: bold;
        font-size: 1.5rem;
        color: #ffebe0;
    }

    .period {
        color: #ffebe0;
        align-self: center;
    }

    .desc {
        color: #ffebe0;
        line-height: 1.5;
    }

    .empty-state {
        display: grid;
        place-items: center;
        gap: 10px;
        color: #777;
    }
</style>
